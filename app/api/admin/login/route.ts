import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json().catch(() => ({}))) as {
      username?: string;
      password?: string;
    };

    const admin = getAdminCredentials();
    if (!admin.username || !admin.password) {
      return NextResponse.json(
        { ok: false, error: "Admin credentials are not configured." },
        { status: 500 }
      );
    }

    if (username !== admin.username || password !== admin.password) {
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
    }

    const token = await createAdminSessionToken(username);
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "AUTH_SECRET is not configured." },
        { status: 500 }
      );
    }

    const store = await cookies();
    store.set(getAdminCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

