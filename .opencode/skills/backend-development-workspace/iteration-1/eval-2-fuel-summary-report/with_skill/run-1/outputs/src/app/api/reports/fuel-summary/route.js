import { query } from "@/lib/db";
import { requireAuth, ok, handleError } from "@/lib/api/utils";

export async function GET(req) {
  try {
    await requireAuth(req);
    const sp = new URL(req.url).searchParams;
    const from = sp.get("from") || "1970-01-01", to = sp.get("to") || "2100-01-01";
    const { rows } = await query(
      `SELECT v.vehicle_id, v.plate_number, v.vehicle_name,
              TO_CHAR(f.fuel_date, 'YYYY-MM') AS month,
              SUM(f.liters) AS total_liters,
              SUM(f.amount) AS total_amount,
              AVG(f.price_per_liter) AS avg_price_per_liter
       FROM fuelrecords f
       JOIN vehicles v ON f.vehicle_id = v.vehicle_id
       WHERE f.deleted_at IS NULL AND f.fuel_date >= $1 AND f.fuel_date <= $2
       GROUP BY v.vehicle_id, v.plate_number, v.vehicle_name, TO_CHAR(f.fuel_date, 'YYYY-MM')
       ORDER BY month, v.vehicle_id`,
      [from, to]
    );
    return ok(rows);
  } catch (e) { return handleError(e); }
}
