import admin from "firebase-admin";

function formatPrivateKey(key?: string) {
    if (!key) return undefined;
    return key.replace(/\\n/g, "\n");
}

const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey,
        }),
    });
}

export default admin;
