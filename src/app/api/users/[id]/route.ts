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
    'SELECT * FROM "user" WHERE id = $1',
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
    prodi
  } = body;

  try {
    const result = await pool.query(
      `UPDATE "user"
       SET uname=$1, fname=$2, lname=$3, bio=$4, img_url=$5,
           phone=$6, address=$7, url_social=$8, url_other=$9, prodi=$10
       WHERE id=$11
       RETURNING *`,
      [uname, fname, lname, bio, img_url, phone, address, url_social, url_other, prodi, params.id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  await pool.query('DELETE FROM "user" WHERE id=$1', [params.id]);
  return NextResponse.json({ message: "Deleted" });
}