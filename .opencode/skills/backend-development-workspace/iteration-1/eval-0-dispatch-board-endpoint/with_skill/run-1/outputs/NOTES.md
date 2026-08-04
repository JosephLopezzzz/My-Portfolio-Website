# Dispatch Board Endpoint — Notes

## Files produced

- `src/app/api/vehicles/dispatch-board/route.js` — GET handler, one row per vehicle with a nested `active_trip` (or `null`).
- `src/services/vehicle.service.js` — full resource file; added `getDispatchBoard(filters = {})` after `getAvailableVehicles`.

## Repo files read for conventions

- `.opencode/skills/backend-development/SKILL.md` — three-layer pattern, route skeleton, service naming, `$n`-only parameterization.
- `src/app/api/vehicles/route.js` — vehicles GET handler (auth, searchParams, `deleted_at IS NULL`, `ok(rows)`, `handleError`).
- `src/app/api/vehicles/available/route.js` — nested GET route under `vehicles/` (the shape the new nested route follows).
- `src/app/api/trips/route.js` — `JOIN_SELECT` / `JOINS` + `row_to_json` join conventions.
- `src/app/api/trips/active/route.js` — authoritative "active trip" definition (see below).
- `src/app/api/trips/latest-locations/route.js` — second "active" status-list usage.
- `src/services/vehicle.service.js` — service function pattern (`apiFetch` + `buildQuery`).
- `src/lib/api/client.js` — `apiFetch` / `buildQuery` behavior (strips empty filters).
- `src/lib/api/utils.js` — `requireAuth`, `ok`, `err`, `handleError`.
- `supabase/migrations/001_schema.sql` — vehicles, trips, drivers, employees, routes, dispatchschedules columns.
- `supabase/migrations/007_normalization.sql` — later schema changes (see design note below).
- `supabase/migrations/012_status_constraints.sql` — `chk_trip_status` allowed values.
- `src/lib/constants.js` — `TRIP_STATUS` enum values.
- UI callers (`drivers/[id]/page.js`, `trips/active/page.js`, `dispatch/[id]/page.js`) — confirm driver full name is `first_name + last_name` from `employees` via `drivers.employee_id`.

## Design decisions

### What counts as an "active" trip
The repo already defines this more precisely than `trip_status = 'In Progress'`.
`src/app/api/trips/active/route.js` treats a trip as active when
`trip_status IN ('Dispatched','Driver Accepted','Trip Started','En Route','Arrived') AND deleted_at IS NULL`,
and `src/app/api/trips/latest-locations/route.js` uses the same family of in-flight statuses.
That is the established convention, so the dispatch board reuses it (via the `ACTIVE_TRIP_STATUSES` constant) rather than inventing a new meaning. `'In Progress'` appears in the schema only as a possible value and is not what the existing "active trips" endpoint filters on.

### One row per vehicle
A plain `LEFT JOIN` on trips could yield duplicate vehicle rows when a vehicle has more than one non-completed trip (e.g. one "Dispatched" for an upcoming assignment and one "En Route"). A `LEFT JOIN LATERAL` with `ORDER BY t.start_time DESC NULLS LAST, t.trip_id DESC LIMIT 1` guarantees exactly one row per vehicle and picks the most recently started active trip. Each vehicle therefore carries `active_trip` = `{ trip_id, trip_status, origin, destination, driver_name }` or `null`.

### Driver full name
Computed in SQL as `(e.first_name || ' ' || e.last_name)` via `drivers.employee_id -> employees`, matching how the UI assembles names (`trips/active/page.js`, `dispatch/[id]/page.js`).

### Soft delete
Both `vehicles.deleted_at IS NULL` and `trips.deleted_at IS NULL` are filtered, consistent with the codebase-wide soft-delete convention.

### Origin / destination columns
Task guidance states `trips.origin` / `trips.destination` exist (they are defined in `001_schema.sql`), so the query reads them directly. Note: `007_normalization.sql` later drops those columns from `trips` and references location FKs for `routes`/`reservations`; the existing `trips/route.js` JOIN_SELECT already references `t.origin_location_id` / `t.destination_location_id`. If the deployed schema is fully migrated to 007, those two columns do not yet exist on `trips` either, and this endpoint would need a follow-up migration to add `origin_location_id`/`destination_location_id` on `trips` (join `locations` for the name) — the database-normalization skill covers that. This implementation follows the task's stated schema.

### Shape of the response
`ok(rows)` returns the raw array of vehicle rows (`v.*` plus `active_trip`), matching the repo convention of returning rows directly from the query.

### Service function
`getDispatchBoard(filters = {})` maps to `GET /api/vehicles/dispatch-board?<filters>`. The endpoint currently takes no filters, but the `filters` param + `buildQuery` mirrors `getAvailableVehicles` so future filtering (branch, search) needs no service change.

### Security / hygiene
- `requireAuth(req)` called first inside the try; handler wrapped in try/catch ending with `handleError`.
- No user input reaches SQL — the only interpolation is the module-level status constant, not request data.
- No code comments added, per the task constraint; rationale lives in this document.
