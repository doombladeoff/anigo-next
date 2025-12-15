import { NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function GET(
    req: Request,
    context: { params: { id: string } | Promise<{ id: string }> }
) {
    const params = await context.params;
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: "No user ID provided" }, { status: 400 });
    }

    try {
        const docRef = admin.firestore().collection("user-collection").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ id: doc.id, ...doc.data() });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
