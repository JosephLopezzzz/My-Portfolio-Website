---
name: backend-development
description: Hands-on backend implementation for the FleetOps fleet transportation management system — building and extending the server-side layers: Next.js API route handlers (src/app/api/**/route.js), service-layer client functions (src/services/*.service.js), and the parameterized raw SQL they run against Supabase/PostgreSQL through src/lib/db.js. Use this whenever the user asks to add a new API endpoint, extend an existing one (filters, pagination, sorting), create or modify service functions, write SQL queries or aggregations against the schema, add a report/data endpoint, debug or fix backend bugs in routes/services, or wire a page to a backend endpoint. This is the hands-on implementation skill — if the user is only planning architecture, reviewing the codebase, or asking "what's the best approach," defer to nextjs-technical-lead. DO NOT use for: schema structure changes and migration SQL for data modeling (database-normalization skill), RLS policies and role-based access control (rbac-implementation skill), or building frontend UI components (frontend-design skill).
compatibility:
  requires: ["src/app/api/ directory with route handlers", "src/services/ directory with service functions", "src/lib/db.js (query())", "src/lib/api/utils.js (requireAuth, parseBody, ok, err, handleError)"]
---

# Backend Development for FleetOps

This skill implements backend features in the FleetOps codebase. It is hands-on: read the relevant existing files, then write code that follows the project's established patterns. Do not write planning docs or ask for architectural sign-off before implementing — just match the conventions you see in sibling files.

## The three layers

Backend features are built in three cooperating layers. A request flows down and a response flows back up:

```
UI component / hook
      ↓  calls
Service function (src/services/*.service.js)   — thin fetch wrapper, client-side
      ↓  HTTP (fetch via apiFetch)
Route handler (src/app/api/**/route.js)        — auth, validation, response
      ↓  query() with $1/$2 placeholders
PostgreSQL (Supabase)                          — raw SQL, schema in supabase/migrations/
```

- **Route handler** — the only layer that talks to the database. Owns auth, input handling, and response shaping.
- **Service function** — a thin wrapper the UI calls. One file per resource, functions named after the endpoint.
- **Database** — accessed exclusively through `query()` from `@/lib/db`, which runs parameterized SQL with the service-role key.

## Layer 1: Route handlers (`src/app/api/**/route.js`)

Every route file exports named async functions (`GET`, `POST`, `PUT`, `DELETE`, sometimes `PATCH`) for the HTTP methods it supports. The standard skeleton:

```js
import { query } from "@/lib/db";
import { requireAuth, parseBody, ok, err, handleError } from "@/lib/api/utils";

export async function GET(req) {
  try {
    await requireAuth(req);
    // ... build SQL and params ...
    const { rows } = await query(sql, params);
    return ok(rows);
  } catch (e) { return handleError(e); }
}
```

### Helpers from `src/lib/api/utils.js`

- `requireAuth(req, allowedRoles?)` — throws `AuthError(401)` when unauthenticated, `AuthError(403)` when the role isn't allowed. Default allowed roles are `["system_admin", "admin", "fleet_manager", "dispatcher", "management"]`. Pass an explicit role list only when the endpoint is narrower (e.g. an admin-only endpoint). Do not invent roles — they come from the seed data and RLS model.
- `parseBody(req)` — parses the JSON body; throws `AuthError(400)` on malformed JSON.
- `ok(data, status = 200)` — JSON success response.
- `err(message, status = 400)` — JSON error response (use `404` for missing records).
- `handleError(e)` — maps `AuthError` to its status, everything else to `500`.

Always call `await requireAuth(req)` first thing inside `try`, and always wrap the handler body in try/catch ending with `return handleError(e)`.

### Reading query params

Filters come in as URL query params. Read them with `URLSearchParams` and append `AND` clauses using an incrementing placeholder index. This keeps user input out of the SQL string entirely:

```js
const sp = new URL(req.url).searchParams;
let sql = `SELECT * FROM trips WHERE deleted_at IS NULL`;
const params = []; let idx = 1;
const status = sp.get("status"); if (status) { sql += ` AND trip_status = $${idx++}`; params.push(status); }
const vid = sp.get("vehicle_id"); if (vid) { sql += ` AND vehicle_id = $${idx++}`; params.push(+vid); }
```

Note the `+vid` coercion for numeric filters — ids are SERIAL integers in this schema.

### Dynamic segments (`[id]` routes)

For a dynamic path like `src/app/api/trips/[id]/route.js`, the handler signature is `(req, { params })`. **`params` is a Promise in this Next.js version — await it:**

```js
export async function GET(req, { params }) {
  try {
    await requireAuth(req);
    const id = (await params).id;
    const { rows } = await query(`SELECT * FROM trips WHERE trip_id = $1 AND deleted_at IS NULL LIMIT 1`, [id]);
    if (!rows[0]) return err("Trip not found", 404);
    return ok(rows[0]);
  } catch (e) { return handleError(e); }
}
```

### Insert and update patterns

The codebase uses dynamic column builders so handlers stay generic. Match them exactly:

```js
// POST — insert any body keys
const k = Object.keys(body), v = Object.values(body);
const { rows } = await query(
  `INSERT INTO trips (${k.join(", ")}) VALUES (${k.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING *`,
  v
);
return ok(rows[0], 201);

// PUT — update any body keys by id
const k = Object.keys(body), v = Object.values(body);
const { rows } = await query(
  `UPDATE trips SET ${k.map((k, i) => `${k} = $${i + 1}`).join(", ")} WHERE trip_id = $${k.length + 1} RETURNING *`,
  [...v, id]
);
if (!rows[0]) return err("Trip not found", 404);
return ok(rows[0]);
```

Nested action endpoints (e.g. `[id]/status`, `[id]/start`, `[id]/complete`) follow the same pattern but update one specific column with a targeted SQL statement.

### Joins and row shaping

Cross-resource reads use a `JOIN_SELECT` / `JOINS` pair of constants with `row_to_json` for one-to-one related records. Copy this pattern when an endpoint must return related data:

```js
const JOIN_SELECT = `t.*, row_to_json(v.*) as vehicles, row_to_json(d.*) as drivers, row_to_json(r.*) as routes`;
const JOINS = `FROM trips t
  LEFT JOIN vehicles v ON t.vehicle_id = v.vehicle_id
  LEFT JOIN drivers d ON t.driver_id = d.driver_id
  LEFT JOIN routes r ON t.route_id = r.route_id`;
const { rows } = await query(`SELECT ${JOIN_SELECT} ${JOINS} WHERE t.deleted_at IS NULL`, []);
```

## Layer 2: Service functions (`src/services/*.service.js`)

Services are thin client-side wrappers over the API. One file per resource (`vehicle.service.js`, `trip.service.js`, ...), importing `apiFetch` and `buildQuery` from `@/lib/api/client`. Convention for function names:

- `get<Resource>s(filters = {})` → `GET /api/<resource>${buildQuery(filters)}`
- `get<Resource>(id)` → `GET /api/<resource>/<id>`
- `create<Resource>(data)` → `POST` with body
- `update<Resource>(id, data)` → `PUT` with body
- action-specific names for nested endpoints (`updateTripStatus(id, status)` → `PUT /api/trips/<id>/status`)

`apiFetch` already returns the parsed JSON response body (and throws on non-2xx), so service functions just return it. `buildQuery` skips null/undefined/empty filter values automatically. When adding a new endpoint, always add the matching service function in the same change — the UI consumes the service, not the API directly.

## Layer 3: Database access

- Import `query` from `@/lib/db`. It's server-only, executes parameterized SQL via the `exec_query` RPC using the service-role key, and returns `{ rows }` (or `{ rowCount }` for statements with no returned data).
- **Never interpolate user-supplied values into a SQL string.** Always use `$n` placeholders with a parallel params array. `query()` runs with a privileged service-role key, so a single interpolated value is a full SQL injection path.
- Respect the soft-delete convention: almost every table has `deleted_at`, and list/get queries filter `WHERE deleted_at IS NULL`.
- Table and column names come from the schema in `supabase/migrations/`. If you need a column or table that doesn't exist, do not fake it — tell the user a schema migration is required and point them to the database-normalization skill.
- Keep row-level security concerns out of this skill — access control lives in RLS policies and `requireAuth`. See the rbac-implementation skill if the user asks for permission work.

## Common workflows

### A. New endpoint end-to-end

1. Find the resource's existing API directory. If it exists, add the handler to its `route.js` or create a nested directory for a new action (e.g. `[id]/status/route.js`). If the resource is brand new, create `src/app/api/<resource>/route.js`.
2. Write the handler using the skeleton above — `requireAuth`, parse inputs, parameterized `query()`, `ok`/`err` responses, `handleError`.
3. Add the matching function(s) to the resource's service file (create it if new).
4. Sanity-check your SQL against the migration files for real column names, and against the service/UI callers for the response shape they expect.

### B. Extend an existing endpoint

- Add optional filter params to the `GET` using the incrementing-placeholder pattern shown above.
- For pagination, read `page`/`pageSize` (or similar) params and append `LIMIT $n OFFSET $n`, returning both rows and a total count when the UI needs it.
- Always keep existing behavior working — new filters are additive `AND` clauses.

### C. Aggregation / report endpoint

Do the math in SQL, not in JavaScript. Fetching every row and counting client-side (as some older handlers do) wastes bandwidth and is slow at fleet scale. Use `GROUP BY`, `COUNT`, `SUM`, `AVG`, and date-truncation functions, and return the pre-aggregated rows:

```sql
SELECT v.vehicle_id, v.plate_number,
       DATE_TRUNC('month', f.fuel_date) AS month,
       COUNT(*) AS fill_ups,
       SUM(f.liters) AS total_liters,
       SUM(f.total_cost) AS total_cost,
       AVG(f.total_cost / NULLIF(f.liters, 0)) AS avg_price_per_liter
FROM fuel_logs f
JOIN vehicles v ON f.vehicle_id = v.vehicle_id
WHERE f.deleted_at IS NULL AND f.fuel_date >= $1
GROUP BY v.vehicle_id, v.plate_number, DATE_TRUNC('month', f.fuel_date)
ORDER BY month DESC, v.vehicle_id;
```

Use `NULLIF(...)` to avoid divide-by-zero. Parameterize date ranges (`from_date`, `to_date`) the same way as other filters.

### D. Debugging a backend issue

- Reproduce by reading the route handler and tracing which service function / UI hook calls it.
- Check the query params actually sent (`buildQuery` strips empties — verify the caller passes values), then check the SQL clauses built from them.
- For "not found" bugs, confirm the id coercion (`+vid`) and the `deleted_at IS NULL` filter aren't hiding a record.
- If a 500 comes back, look for unparameterized input, a column name mismatch with the migration files, or a divide-by-zero in report queries.

## When in doubt

- Read a sibling route/service before writing anything new — matching the existing style matters more than following any doc.
- Keep handlers and services small and single-purpose, mirroring how the rest of the codebase is organized.
- If the task would change table structure, RLS, or the RBAC model, stop and route the user to the appropriate skill (database-normalization or rbac-implementation) instead of mixing schema work into endpoint code.

## Validation checklist

Before reporting done, verify each item:

- [ ] Every handler calls `await requireAuth(req)` inside a try/catch that ends with `handleError`
- [ ] All user input reaches SQL only through `$n` placeholders — no string interpolation
- [ ] SQL column/table names match the schema in `supabase/migrations/`
- [ ] List/get queries filter `deleted_at IS NULL` (unless the endpoint intentionally includes deleted records)
- [ ] Response shapes match what the service function and UI caller expect
- [ ] Nested routes use `(await params).id` and return `err(..., 404)` for missing records
- [ ] A matching service function exists in `src/services/` for every new/changed endpoint
- [ ] Aggregations run in SQL, not in JavaScript
