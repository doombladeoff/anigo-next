import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, UserCredential } from "firebase/auth";
import { auth, provider } from "../firebase";

const handleSession = async (user: UserCredential) => {
    if (!user.user) throw new Error("No user returned from authentication");
    const idToken = await user.user.getIdToken();
    await fetch("/api/auth/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
    });
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await handleSession(userCredential);
        }).catch((error) => {
            console.error("Error during email/password login:", error);
        });
};

export const loginWithGoogle = async () => {
    await signInWithRedirect(auth, provider);
};

export const loginWithGooglePopup = async () => {
    await signInWithPopup(auth, provider)
        .then(async (result: UserCredential) => {
            await handleSession(result);
        }).catch((error) => {
            console.error("Error during Google login:", error);
        });
};