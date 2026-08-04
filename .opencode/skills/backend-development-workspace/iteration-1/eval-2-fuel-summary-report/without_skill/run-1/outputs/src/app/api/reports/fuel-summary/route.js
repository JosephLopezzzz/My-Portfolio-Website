import { query } from "@/lib/db";
import { requireAuth, ok, handleError } from "@/lib/api/utils";

export async function GET(req) {
  try {
    await requireAuth(req);
    const sp = new URL(req.url).searchParams;
    const from = sp.get("from") || "1970-01-01", to = sp.get("to") || "2100-01-01";
    const { rows } = await query(
      `SELECT
         f.vehicle_id,
         v.plate_number,
         v.vehicle_name,
         to_char(f.fuel_date, 'YYYY-MM') AS month,
         COALESCE(SUM(f.liters), 0) AS total_liters,
         COALESCE(SUM(f.amount), 0) AS total_amount,
         COALESCE(AVG(f.price_per_liter), SUM(f.amount) / NULLIF(SUM(f.liters), 0)) AS avg_price_per_liter
       FROM fuelrecords f
       JOIN vehicles v ON v.vehicle_id = f.vehicle_id
       WHERE f.fuel_date >= $1 AND f.fuel_date <= $2
         AND f.deleted_at IS NULL AND v.deleted_at IS NULL
       GROUP BY f.vehicle_id, v.plate_number, v.vehicle_name, to_char(f.fuel_date, 'YYYY-MM')
       ORDER BY v.plate_number ASC, month ASC`,
      [from, to]
    );
    return ok(rows || []);
  } catch (e) { return handleError(e); }
}
