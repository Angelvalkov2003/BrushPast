import { NextRequest, NextResponse } from "next/server";
import {
  getAdminPassword,
  setAdminSession,
  verifyAdminPassword,
} from "lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    if (!getAdminPassword()) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD is not configured on the server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    await setAdminSession();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
