import { NextResponse } from "next/server";
import { Client } from "kodikwrapper";
import { VoiceOversID } from "@/contants/VoiceOversID";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 20;

    const token = process.env.KODIK_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: "KODIK_TOKEN is missing" },
            { status: 500 }
        );
    }

    try {
        const client = Client.fromToken(token);

        const lastUpdates = await client.list({
            limit,
            translation_type: "voice",
            types: "anime-serial",
            with_material_data: true,
            translation_id: VoiceOversID,
        });

        return NextResponse.json(lastUpdates.results, { status: 200 });
    } catch (error) {
        console.error("[KODIK API ERROR]:", error);
        return NextResponse.json(
            { error: "Failed to load data" },
            { status: 500 }
        );
    }
}
