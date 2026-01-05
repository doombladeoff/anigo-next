import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
    try {
        const cookie = await cookies();
        const authHeader = req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader?.split("Bearer ")[1];

        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }

        const decoded = await adminAuth.verifyIdToken(token);

        const uid = decoded.uid;
        const email = decoded.email;
        const displayName = decoded.name;

        const userRef = adminDb.collection("user-collection").doc(uid);
        const snap = await userRef.get();

        if (!snap.exists) {
            await userRef.set({
                uid,
                email,
                displayName,
                photoURL: decoded.picture ?? null,
                lastLoginAt: FieldValue.serverTimestamp(),
                friends: [],
                folders: [],
                rang: {
                    level: 1,
                    exp: 0,
                },
                watchStats: {
                    watchTime: 0,
                    watchedEpisodes: 0,
                },
                status: '',
                createdAt: new Date()
            });
        } else {
            console.log("[SESSION] User already exists");
        }

        const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 дней

        const sessionCookie = await adminAuth.createSessionCookie(token, {
            expiresIn,
        });

        cookie.set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: expiresIn / 1000,
        });

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error("[SESSION ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
