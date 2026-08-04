# NOTES — GET /api/fuel returns { rows, total }

## Repo files read
- `src/app/api/fuel/route.js` — the GET handler to modify (filters + LIMIT/OFFSET pagination).
- `src/services/fuel.service.js` — `getFuelRecords(filters)` → `apiFetch(\`/api/fuel${buildQuery(filters)}\`)`.
- `src/lib/db.js` — `query()` wraps the `exec_query` RPC and returns `{ rows }`; single-row objects come back as `{ rows: [row] }`.
- `src/lib/api/utils.js` — `ok`, `err`, `handleError`, `requireAuth`.
- `src/lib/api/client.js` — `apiFetch` returns raw JSON body; `buildQuery` serializes filters (page/pageSize pass through).
- `supabase/migrations/001_schema.sql` — `fuelrecords`, `vehicles`, `drivers`, `employees` tables (all LEFT JOINable 1:1 parents).
- `src/app/api/vehicles/route.js` — closest sibling list route (same pagination style, no total yet).
- `src/app/(dashboard)/fuel/page.js` — current UI consumer of `getFuelRecords()` (see caveat below).

## Design decisions
1. **Response shape**: `ok({ rows, total })` — `rows` keeps the existing list exactly; `total` is added.
2. **COUNT honors the same filters, including joins.** The `search` filter references joined columns (`v.plate_number`, `e.first_name`, `e.last_name`), so the COUNT query reuses the exact same LEFT JOIN set (`vehicles`, `drivers`, `employees`) and the same WHERE string, before any LIMIT/OFFSET. Because every join is a 1:1 parent relationship (one fuel record → one vehicle/driver/employee), `COUNT(*)` is correct and not multiplied by the joins.
3. **Shared WHERE builder.** The filter conditions are now appended to a shared `where` string with `countParams`, so the data query and the count query can never drift apart. The data query clones `countParams` and appends LIMIT/OFFSET separately; the count query uses `countParams` alone.
4. **`COUNT(*)::int AS total`** — cast to `int` so the value serializes cleanly to JSON through the `exec_query` RPC (raw `COUNT(*)` is a `bigint`).
5. **Parallel execution** via `Promise.all` — both queries are independent after `requireAuth`, saving one round trip.
6. **Filter behavior unchanged**: `vehicle_id`, `driver_id`, `fuel_type`, `status` (skipped for "all"), `search` (ILIKE with `%term%`), `from_date`/`to_date`, `ORDER BY fr.fuel_record_id DESC`, and the `LIMIT/OFFSET` gate on `page && pageSize` are all preserved byte-for-byte in logic.

## Service layer
- `getFuelRecords` needs **no change**: `apiFetch` returns whatever JSON the route returns (now `{ rows, total }`), and `buildQuery` already passes `page`/`pageSize` (and all other filters) through as query params. `src/services/fuel.service.js` is copied unchanged into outputs for completeness.

## Caveat for the UI side (out of scope for this backend task)
- `src/app/(dashboard)/fuel/page.js` currently calls `getFuelRecords()` with no filters and treats the response as an array (`records.filter(...)`, `records.length`, export). Once the route returns `{ rows, total }`, the page must consume `data.rows` (and use `data.total` for total-page calculation). That frontend update is expected to be handled by the UI task; the backend change is the contract `{ rows, total }`.
