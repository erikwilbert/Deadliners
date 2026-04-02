import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/neon";

// GET semua user
export async function GET() {
  const result = await pool.query('SELECT * FROM "user" ORDER BY created_at DESC');
  return NextResponse.json(result.rows);
}

// CREATE user
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    uname,
    gmail,
    fname,
    lname,
    birth_date,
    birth_location,
    gender,
    status_relationship,
    bio,
    img_url,
    profile_url,
    phone,
    address,
    url_social,
    url_other,
    prodi
  } = body;

  try {
    const result = await pool.query(
      `INSERT INTO "user" 
      (uname, gmail, fname, lname, birth_date, birth_location,
       gender, status_relationship, bio, img_url, profile_url,
       phone, address, url_social, url_other, prodi)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *`,
      [
        uname,
        gmail,
        fname,
        lname,
        birth_date,
        birth_location,
        gender,
        status_relationship,
        bio,
        img_url,
        profile_url,
        phone,
        address,
        url_social,
        url_other,
        prodi
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}