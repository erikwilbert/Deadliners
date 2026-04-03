import { NextResponse } from "next/server";
import pool from "@/lib/neon";

// GET semua user
export async function GET() {
  const result = await pool.query(
    'SELECT u.* FROM "user" u INNER JOIN admin a ON u.gmail = a.gmail ORDER BY u.created_at DESC'
  );
  return NextResponse.json(result.rows);
}
