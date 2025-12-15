import { NextResponse, NextRequest } from "next/server";
import admin from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
    const sessionCookie = req.cookies.get("session")?.value;

    if (!sessionCookie) {
        return NextResponse.json({ user: null });
    }

    try {
        const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
        const userRecord = await admin.auth().getUser(decoded.uid);
        return NextResponse.json({ user: userRecord });
    } catch (err) {
        return NextResponse.json({ user: null });
    }
}
