// /app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function GET(req: Request) {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/session=([^;]+)/);
    const idToken = match?.[1];

    if (!idToken) return NextResponse.json({ loggedIn: false });

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return NextResponse.json({ loggedIn: true, uid: decodedToken.uid });
    } catch {
        return NextResponse.json({ loggedIn: false });
    }
}
