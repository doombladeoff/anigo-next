import { NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json(
            { error: "No user ID provided" },
            { status: 400 }
        );
    }

    try {
        const doc = await admin
            .firestore()
            .collection("user-collection")
            .doc(id)
            .get();

        if (!doc.exists) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: doc.id,
            ...doc.data(),
        });
    } catch (err: any) {
        console.error(`API Error: ${err}`);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
