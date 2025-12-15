import { NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: "No token provided" }, { status: 400 });

    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 дней
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ success: true });
    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
};