import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import pool from "@/lib/neon";
import type { UserAccent } from "@/types/user";

const allowedAccents: UserAccent[] = ["indigo", "cyan", "emerald"];
type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET by ID
export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const result = await pool.query(
    'SELECT id, npm, uname, gmail, fname, lname, birth_date, birth_location, gender, status_relationship, bio, img_url, phone, address, url_social, url_other, prodi, accent FROM "user" WHERE id = $1',
    [id]
  );

  return NextResponse.json(result.rows[0] || null);
}

// UPDATE user
export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.id !== id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as Record<string, unknown>;

  const uname = typeof body.uname === "string" ? body.uname.trim() : "";
  const fname = typeof body.fname === "string" ? body.fname.trim() : "";
  const lname = typeof body.lname === "string" ? body.lname.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const birthLocation =
    typeof body.birth_location === "string" ? body.birth_location.trim() : "";
  const birthDate =
    typeof body.birth_date === "string" ? body.birth_date.trim() : "";
  const gender =
    typeof body.gender === "string" ? body.gender.trim() : "";
  const statusRelationship =
    typeof body.status_relationship === "string" ? body.status_relationship.trim() : "";
  const prodi = typeof body.prodi === "string" ? body.prodi.trim() : "";
  const accent = typeof body.accent === "string" ? body.accent : "";
  const npm = typeof body.npm === "string" ? body.npm.trim() : "";

  if (!uname || !fname || !lname) {
    return NextResponse.json(
      {
        message:
          "Username, first name, and last name are required.",
      },
      { status: 400 },
    );
  }

  if (!allowedAccents.includes(accent as UserAccent)) {
    return NextResponse.json(
      { message: "Accent must be indigo, cyan, or emerald." },
      { status: 400 },
    );
  }

  try {
    const result = await pool.query(
      `UPDATE "user"
       SET uname=$1, fname=$2, lname=$3, bio=$4, phone=$5,
           address=$6, birth_location=$7, birth_date=$8, gender=$9, status_relationship=$10, prodi=$11, accent=$12, npm=$13
       WHERE id=$14
       RETURNING *`,
      [
        uname,
        fname,
        lname,
        bio,
        phone,
        address,
        birthLocation,
        birthDate || null,
        gender,
        statusRelationship,
        prodi,
        accent,
        npm,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ message: "Update failed", error: String(err) }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await pool.query(
      `DELETE FROM "user"
       WHERE id=$1`,
      [id]
    );

    return NextResponse.json({ message: "User deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
