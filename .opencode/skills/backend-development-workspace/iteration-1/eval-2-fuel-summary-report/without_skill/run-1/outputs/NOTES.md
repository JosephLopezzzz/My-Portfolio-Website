# Notes — Monthly Fuel Summary Report (eval-2)

## Repo files read (read-only)
- `src/app/api/reports/fuel-consumption/route.js` — existing report route; pulls every row and aggregates in JS. **Not copied**.
- `src/app/api/reports/financial/route.js` — second report route; same client-side reduce pattern.
- `src/services/fuel.service.js` — where `getFuelSummary()` was added.
- `src/services/report.service.js` — cross-checked service conventions (apiFetch + buildQuery).
- `src/lib/db.js` — `query(text, params)` returns `{ rows }`; params are positional ($1/$2).
- `src/lib/api/utils.js` — `requireAuth`, `ok`, `handleError`, `AuthError`.
- `src/lib/api/client.js` — `apiFetch(path, { body, method })`, `buildQuery(params)`.
- `supabase/migrations/001_schema.sql` — `fuelrecords` (liters, amount, price_per_liter nullable, fuel_date DATE, vehicle_id, deleted_at); `vehicles` (vehicle_id, plate_number, vehicle_name, deleted_at).

## Design decisions
1. **Aggregation in SQL** — single query with `GROUP BY` over vehicle + month, so the DB returns pre-aggregated rows. No row-by-row JS accumulation.
2. **Month bucket** — `to_char(f.fuel_date, 'YYYY-MM')` gives a stable `YYYY-MM` string (used in GROUP BY, SELECT, and ORDER BY), simpler than casting DATE_TRUNC output.
3. **Average price per liter** — `COALESCE(AVG(price_per_liter), SUM(amount)/NULLIF(SUM(liters),0))`: uses stored `price_per_liter` when present; falls back to amount/liters when missing (column is nullable in schema).
4. **Vehicle info via JOIN** — `LEFT` semantics not needed since `vehicle_id` is NOT NULL; used INNER JOIN and included `plate_number`/`vehicle_name` in GROUP BY.
5. **Soft-delete handling** — filters `f.deleted_at IS NULL AND v.deleted_at IS NULL` to exclude archived records/vehicles (schema has `deleted_at` on both tables).
6. **Defaults** — `from` defaults to `1970-01-01`, `to` to `2100-01-01` (matches existing report routes).
7. **Route skeleton** — `requireAuth` → parse `from`/`to` → `query` → `ok(...)` with `handleError` in catch, mirroring existing routes.
8. **Response shape** — `ok(rows)` returns the pre-aggregated rows directly (each row: vehicle_id, plate_number, vehicle_name, month, total_liters, total_amount, avg_price_per_liter), ordered by plate then month.
9. **Service function** — `getFuelSummary(from, to)` added to `src/services/fuel.service.js` using `apiFetch` + `buildQuery`, matching the file's existing style.

## Files written
- `src/app/api/reports/fuel-summary/route.js`
- `src/services/fuel.service.js` (full file incl. new `getFuelSummary`)
