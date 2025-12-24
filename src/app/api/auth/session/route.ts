import { cookies } from "next/headers";
import admin from "@/lib/firebase-admin";

export async function POST(req: Request) {
    const cookie = await cookies();
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 дней

    const sessionCookie = await admin
        .auth()
        .createSessionCookie(token, { expiresIn });

    cookie.set("session", sessionCookie, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: expiresIn / 1000,
    });

    return new Response(null, { status: 200 });
}
