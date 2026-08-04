# NOTES — Monthly Fuel Summary Report

## Repo files read (read-only, no edits made to the real repo)

- `.opencode/skills/backend-development/SKILL.md` — implementation guidance (route skeleton, aggregation in SQL, parameterized queries, service conventions).
- `src/app/api/reports/fuel-consumption/route.js` — existing report route studied for conventions; NOT copied because it pulls every row into JS and aggregates client-side (slow). Note it also returns an empty `byVehicle: []` — the SQL-side aggregation here replaces that gap.
- `src/app/api/reports/financial/route.js` — confirms the report route shape: `requireAuth` -> `URLSearchParams` with `from`/`to` defaults `1970-01-01`/`2100-01-01` -> `query()` -> `ok(...)` -> `handleError`.
- `src/services/fuel.service.js` — existing service conventions (`apiFetch` + `buildQuery`), used as the base for the new `getFuelSummary()`.
- `src/lib/db.js` — `query(text, params)` runs parameterized SQL and returns `{ rows }`.
- `src/lib/api/utils.js` — `requireAuth`, `ok`, `err`, `handleError` signatures.
- `supabase/migrations/001_schema.sql` — confirmed `fuelrecords` columns (`liters`, `amount`, `price_per_liter`, `fuel_date`, `vehicle_id`, `deleted_at`) and `vehicles` columns (`vehicle_id`, `plate_number`, `vehicle_name`). All real; no schema change needed.

## Design decisions

- **Aggregation in SQL, not JS.** The route uses `GROUP BY` on `vehicle_id, plate_number, vehicle_name, TO_CHAR(fuel_date, 'YYYY-MM')` and returns pre-aggregated rows, avoiding the client-side `reduce`/`forEach` approach used by `fuel-consumption`. One row per vehicle-month.
- **Month key** is `TO_CHAR(fuel_date, 'YYYY-MM')`, producing the same `YYYY-MM` shape the existing `fuel-consumption` report computes in JS (substring of ISO date), so UI consumers can reuse the same month-label handling.
- **Avg price per liter** = `AVG(f.price_per_liter)`. The `price_per_liter` column IS stored in the schema (nullable), so per the task spec we use `AVG` directly; `AVG` ignores NULL rows. If the column ever dropped, the fallback would be `SUM(amount)/NULLIF(SUM(liters), 0)` — documented here, not coded.
- **Date params** `from`/`to` default to `1970-01-01`/`2100-01-01`, matching the sibling report routes exactly. Both reach SQL only as `$1`/`$2` placeholders — no string interpolation.
- **Soft-delete respected**: `WHERE f.deleted_at IS NULL` on fuelrecords.
- **Vehicle info via JOIN** — `JOIN vehicles v ON f.vehicle_id = v.vehicle_id` includes `plate_number`/`vehicle_name`. Vehicle id is NOT NULL in the schema, so an inner JOIN is safe (no orphaned records need a LEFT JOIN).
- **Route skeleton** follows the standard: `await requireAuth(req)` first inside try, `ok(rows)` success, `handleError(e)` catch.
- **Service function** `getFuelSummary(filters = {})` follows the `get<X>s(filters)` convention, hitting `GET /api/reports/fuel-summary` via `apiFetch` and `buildQuery`, which skips empty filter values automatically.
- **No divide-by-zero risk**: `AVG()` needs no `NULLIF` guard; the fallback branch would require `NULLIF(SUM(liters), 0)` but was not needed.

## Response shape

`ok(rows)` — an array of:
```json
{
  "vehicle_id": 1,
  "plate_number": "ABC-123",
  "vehicle_name": "Toyota HiAce",
  "month": "2026-07",
  "total_liters": 450.50,
  "total_amount": 30183.50,
  "avg_price_per_liter": 66.99
}
```
Ordered by month ascending, then vehicle_id — matching the skill's report example.
