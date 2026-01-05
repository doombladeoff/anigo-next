import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function formatPrivateKey(key?: string) {
    if (!key) return undefined;
    return key.replace(/\\n/g, "\n");
}

const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

const app =
    getApps().length === 0
        ? admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey,
            }),
        })
        : getApps()[0];


export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export default admin;
