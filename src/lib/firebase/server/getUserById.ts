import admin from "@/lib/firebase-admin";

export async function getUserById(id: string) {
    const doc = await admin
        .firestore()
        .collection("user-collection")
        .doc(id)
        .get();

    if (!doc.exists) return null;

    const data = doc.data()!;

    return {
        id: doc.id,
        ...data,

        lastLoginAt: data.lastLoginAt
            ? data.lastLoginAt.toMillis()
            : null,
    };
}
