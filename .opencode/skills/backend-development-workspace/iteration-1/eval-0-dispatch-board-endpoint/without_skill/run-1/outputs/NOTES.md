# Notes — GET /api/vehicles/dispatch-board + getDispatchBoard()

## Files read for conventions
- `src/app/api/vehicles/route.js` — route handler pattern (requireAuth, ok, handleError, `row_to_json(vc.*) as vehiclecategories`, soft-delete filter `deleted_at IS NULL`, ordering).
- `src/app/api/vehicles/available/route.js` — nested-route handler pattern (same imports, no pagination).
- `src/app/api/trips/route.js` — `JOIN_SELECT` / `row_to_json` join pattern (`origin_location`/`destination_location` via `locations`).
- `src/app/api/trips/active/route.js` — canonical definition of "active" trip statuses.
- `src/app/api/fuel/route.js` — pattern for embedding employee name inside a driver object (`json_build_object` + `employees, row_to_json(e.*)`).
- `src/app/api/drivers/route.js` — employee join (`LEFT JOIN employees e ON d.employee_id = e.employee_id`).
- `src/services/vehicle.service.js` — service function pattern (`apiFetch` + optional `buildQuery`).
- `src/services/trip.service.js`, `src/services/dispatch.service.js` — no-arg convenience service wrappers (e.g. `getActiveTrips()`).
- `src/lib/api/utils.js` — `requireAuth`, `ok`, `handleError`.
- `src/lib/api/client.js` — `apiFetch`.
- `src/lib/db.js` — `query(text, params)` returning `{ rows }`.
- `supabase/migrations/001_schema.sql` — base schema.
- `supabase/migrations/005_schema_cleanup.sql`, `007_normalization.sql`, `012_status_constraints.sql` — post-baseline schema reality.

## Design decisions
1. **"Active" trip definition.** The repo's canonical active-trips endpoint
   (`src/app/api/trips/active/route.js`) uses
   `trip_status IN ('Dispatched','Driver Accepted','Trip Started','En Route','Arrived')`
   with `deleted_at IS NULL`. `src/services/status.service.js` additionally treats
   `'In Progress'` as a trip that puts a vehicle "In Use". I unioned both sets:
   `('Dispatched','Driver Accepted','Trip Started','En Route','Arrived','In Progress')`.
   `'Completed'` / `'Cancelled'` / pre-assignment states (`Assigned`, `Pending`, `Approved`) are excluded.
   Soft-deleted trips are excluded via `t.deleted_at IS NULL`.

2. **`trips.origin` / `trips.destination` no longer exist.** Migration `007_normalization.sql`
   drops those columns (lines 162–166). Origin/destination are now resolved through
   `trips.origin_location_id` / `trips.destination_location_id` → `locations`, matching the
   `JOIN_SELECT` convention in the trips routes. I expose both flattened `origin`/`destination`
   strings (via `COALESCE(location name, route origin/destination)`) — which is what dashboard
   components read (`trip.origin`/`trip.destination`) — and nested `origin_location`/
   `destination_location` objects for consistency with the trips route shape.

3. **Driver full name.** `drivers` holds no name; the name lives on `employees`
   (`drivers.employee_id` → `employees.first_name`/`last_name`). I embedded it following the
   fuel-route pattern: `activetrip.drivers.driver_id` + `activetrip.drivers.employees.{first_name,last_name}`.

4. **One row per vehicle.** Joined the active trip into the `FROM` clause with the status/soft-delete
   predicates on the join, then used `DISTINCT ON (v.vehicle_id)` + `t.start_time DESC NULLS LAST`
   so a vehicle can never appear twice even if multiple rows share an active-ish status; vehicles
   with no active trip still appear once with `activetrip = null`.

5. **`activetrip` is `null` when a vehicle has no active trip.** Because the trips join is a LEFT
   JOIN, vehicles without an active trip return `activetrip: null` rather than a JSON object of nulls.
   Callers can branch on `row.activetrip` (or `row.activetrip?.trip_id`).

6. **Naming.** Nested JSON keys follow existing route aliases: `vehiclecategories`,
   `origin_location`, `destination_location`, `drivers`, `employees`. The active-trip payload is
   keyed `activetrip` (lowercase, matching `row_to_json`-style single-word aliases used elsewhere).

7. **Auth / response.** `await requireAuth(req)` with default allowed roles, `ok(rows)` on success,
   `handleError` on failure — identical to every other GET route handler in the repo.

8. **Service function.** `getDispatchBoard()` is a no-arg `apiFetch("/api/vehicles/dispatch-board")`
   wrapper, mirroring `getActiveTrips()` in `trip.service.js`. It was appended right after
   `getAvailableVehicles()` so it groups with the other vehicle-listing helpers.
