import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const sessionCookies = await cookies();
    const session = sessionCookies.get("session");

    if (!session) {
        return NextResponse.json({}, { status: 401 });
    }

    const user = await adminAuth.verifySessionCookie(session.value);

    return NextResponse.json(user);
}
