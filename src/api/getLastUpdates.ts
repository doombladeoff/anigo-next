import { VoiceOversID } from "@/contants/VoiceOversID";
import { Client } from "kodikwrapper";

export const getLastUpdatets = async (limit?: number) => {
    const token = process.env.KODIK_TOKEN!;

    try {
        if (!token || token === '') throw new Error('Ошибка токена');

        const client = Client.fromToken(token);
        const lastUpdates = await client.list({
            limit: limit ? limit : 20,
            translation_type: 'voice',
            types: 'anime-serial',
            with_material_data: true,
            translation_id: VoiceOversID,
        });

        return lastUpdates.results;
    } catch (error) {
        console.error('[KODIK API ERROR]: ', error);
        return [];
    };
};