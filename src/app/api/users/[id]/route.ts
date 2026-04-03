import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/neon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await pool.query(
    'SELECT npm, uname, gmail, fname, lname, birth_date, birth_location, gender, status_relationship, bio, img_url, phone, address, url_social, url_other, prodi, accent FROM "user" WHERE id = $1',
    [params.id]
  );

  return NextResponse.json(result.rows[0] || null);
}

// UPDATE user
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const {
    uname,
    fname,
    lname,
    bio,
    img_url,
    phone,
    address,
    url_social,
    url_other,
    prodi,
    accent
  } = body;

  try {
    const result = await pool.query(
      `UPDATE "user"
       SET uname=$1, fname=$2, lname=$3, bio=$4, img_url=$5,
           phone=$6, address=$7, url_social=$8, url_other=$9, prodi=$10, accent=$11
       WHERE id=$12
       RETURNING *`,
      [uname, fname, lname, bio, img_url, phone, address, url_social, url_other, prodi, accent, params.id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}