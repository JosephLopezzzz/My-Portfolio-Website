import { query } from "@/lib/db";
import { requireAuth, ok, handleError } from "@/lib/api/utils";

export async function GET(req) {
  try {
    await requireAuth(req);

    const sql = `
      SELECT DISTINCT ON (v.vehicle_id)
        v.*,
        row_to_json(vc.*) AS vehiclecategories,
        json_build_object(
          'trip_id', t.trip_id,
          'trip_status', t.trip_status,
          'start_time', t.start_time,
          'end_time', t.end_time,
          'origin', COALESCE(ol.name, r.origin),
          'destination', COALESCE(dl.name, r.destination),
          'origin_location', row_to_json(ol.*),
          'destination_location', row_to_json(dl.*),
          'drivers', json_build_object(
            'driver_id', d.driver_id,
            'license_number', d.license_number,
            'employees', json_build_object(
              'employee_id', e.employee_id,
              'first_name', e.first_name,
              'last_name', e.last_name
            )
          )
        ) AS activetrip
      FROM vehicles v
      LEFT JOIN vehiclecategories vc ON v.category_id = vc.category_id
      LEFT JOIN trips t ON t.vehicle_id = v.vehicle_id
        AND t.trip_status IN ('Dispatched','Driver Accepted','Trip Started','En Route','Arrived','In Progress')
        AND t.deleted_at IS NULL
      LEFT JOIN drivers d ON t.driver_id = d.driver_id
      LEFT JOIN employees e ON d.employee_id = e.employee_id
      LEFT JOIN locations ol ON t.origin_location_id = ol.location_id
      LEFT JOIN locations dl ON t.destination_location_id = dl.location_id
      LEFT JOIN routes r ON t.route_id = r.route_id
      WHERE v.deleted_at IS NULL
      ORDER BY v.vehicle_id DESC, t.start_time DESC NULLS LAST
    `;

    const { rows } = await query(sql);
    return ok(rows);
  } catch (e) { return handleError(e); }
}
