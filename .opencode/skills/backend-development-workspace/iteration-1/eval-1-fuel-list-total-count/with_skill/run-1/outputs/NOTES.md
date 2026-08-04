# Eval 1 — Fuel list total count

## Repo files read (read-only, no edits to the repo)

- `src\app\api\fuel\route.js` — current GET handler (vehicle_id/driver_id/fuel_type/status/search/from_date/to_date filters + LIMIT/OFFSET pagination). This is the file modified.
- `src\services\fuel.service.js` — `getFuelRecords(filters)` → `apiFetch(\`/api/fuel${buildQuery(filters)}\`)`.
- `src\lib\db.js` — `query()` returns `{ rows }` (or `{ rows: [data] }` for a single-object row).
- `src\lib\api\utils.js` — `requireAuth`, `ok`, `err`, `handleError`.
- `src\lib\api\client.js` — `apiFetch` returns the parsed JSON body; `buildQuery` stringifies and strips empty/undefined/null values.
- `supabase\migrations\001_schema.sql` — `fuelrecords` table (fuel_record_id SERIAL PK, vehicle_id, driver_id, fuel_type, fuel_date, status, deleted_at) and `vehicles`/`drivers`/`employees` FK columns.
- `src\app\(dashboard)\fuel\page.js` — UI caller (calls `getFuelRecords()`); confirms response shape is consumed as a list.
- `src\app\api\drivers\stats\route.js`, other `src\app\api\reports\*\route.js` — no existing COUNT-with-pagination pattern to copy; paginated COUNT is new to the codebase.

## Changes made

**`src\app\api\fuel\route.js` (GET)**
- Response changed from `ok(rows)` to `ok({ rows, total })`.
- `rows` is unchanged — same SELECT/joins/shape, same filters, same `ORDER BY fr.fuel_record_id DESC`, same LIMIT/OFFSET when `page`/`pageSize` present.
- `total` is computed with `SELECT COUNT(*) AS count ...` using the exact same WHERE clause and params, **before** LIMIT/OFFSET is applied, so pagination doesn't skew the count.
- Coerced with `Number(...)` (COUNT can come back as a string via the `exec_query` RPC). Falls back to `0`.

**`src\services\fuel.service.js` — no change.**
- `apiFetch` returns whatever JSON the route returns, so `getFuelRecords(filters)` now transparently receives `{ rows, total }`.
- `buildQuery(filters)` already passes `page`/`pageSize` through as URL params; nothing to add.

## Design decisions

1. **One shared WHERE builder.** Filter clauses and the `params` array are built once and reused by both the COUNT query and the rows SELECT, guaranteeing `total` honors the exact same filters as `rows`.
2. **COUNT keeps the joins.** The `search` filter references joined columns (`v.plate_number`, `e.first_name`, `e.last_name`), so the COUNT query reuses the same `JOINS` block (`vehicles`, `drivers`, `employees`) — otherwise the `search` condition would fail on a bare `FROM fuelrecords`. The `d` (drivers) join is needed for `d.employee_id → e`.
3. **COUNT runs before LIMIT/OFFSET params are pushed.** The count executes against the filter-only `params` array; LIMIT/OFFSET placeholders are appended after, so parameter indexes stay aligned.
4. **`fr.deleted_at IS NULL` honored in both queries** (soft-delete convention).
5. **Status filter behavior preserved verbatim** (`status !== "all"`, `ILIKE`) — existing behavior intact.

## Validation checklist (from backend-development skill)

- [x] `requireAuth(req)` inside try/catch ending with `handleError` — unchanged.
- [x] All user input via `$n` placeholders — no interpolation added.
- [x] Column/table names match `supabase/migrations/001_schema.sql`.
- [x] `deleted_at IS NULL` filter present in rows and count.
- [x] Response shape matches service contract — `{ rows, total }`; service passes it through untouched.
- [x] No new service function needed; existing `getFuelRecords` already passes pagination through.
- [x] Aggregation (count) computed in SQL, not in JS.
