import { cookies } from "next/headers";
import admin from "@/lib/firebase-admin";

import type { UserRecord } from "firebase-admin/auth";

type SafeUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
};

function mapUser(user: UserRecord): SafeUser {
    return {
        uid: user.uid,
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        photoURL: user.photoURL ?? null,
    };
}

export async function getServerUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) return null;

    try {
        const decoded = await admin
            .auth()
            .verifySessionCookie(session, true);

        const userRecord = await admin.auth().getUser(decoded.uid);

        return mapUser(userRecord);
    } catch (err) {
        console.error("Invalid session", err);
        return null;
    }
}
