import { NextResponse } from "next/server";
import pool from "@/lib/neon";

// GET semua user
export async function GET() {
  const result = await pool.query('SELECT * FROM "user" ORDER BY created_at DESC');
  return NextResponse.json(result.rows);
}
