import { query } from "@/lib/db";
import { requireAuth, ok, handleError } from "@/lib/api/utils";

const ACTIVE_TRIP_STATUSES = `'Dispatched','Driver Accepted','Trip Started','En Route','Arrived'`;

export async function GET(req) {
  try {
    await requireAuth(req);
    const { rows } = await query(`
      SELECT v.*, at.active_trip
      FROM vehicles v
      LEFT JOIN LATERAL (
        SELECT json_build_object(
          'trip_id', t.trip_id,
          'trip_status', t.trip_status,
          'origin', t.origin,
          'destination', t.destination,
          'driver_name', (e.first_name || ' ' || e.last_name)
        ) AS active_trip
        FROM trips t
        LEFT JOIN drivers d ON t.driver_id = d.driver_id
        LEFT JOIN employees e ON d.employee_id = e.employee_id
        WHERE t.vehicle_id = v.vehicle_id
          AND t.deleted_at IS NULL
          AND t.trip_status IN (${ACTIVE_TRIP_STATUSES})
        ORDER BY t.start_time DESC NULLS LAST, t.trip_id DESC
        LIMIT 1
      ) at ON true
      WHERE v.deleted_at IS NULL
      ORDER BY v.vehicle_id DESC
    `);
    return ok(rows);
  } catch (e) { return handleError(e); }
}
