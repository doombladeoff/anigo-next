import { signInWithPopup, signInWithRedirect, UserCredential } from "firebase/auth";
import { auth, provider } from "../firebase";
import { createUser } from "./create-user";

export const loginWithGoogle = async () => {
    await signInWithRedirect(auth, provider);
};

export const loginWithGooglePopup = async () => {
    await signInWithPopup(auth, provider)
        .then(async (result: UserCredential | null) => {
            console.log('Google sign-in', result);
            if (!result) return;

            const idToken = await result.user.getIdToken();

            const res = await fetch("/api/auth/session", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (res.ok) {
                await createUser(result.user);
            } else {
                console.error(await res.text());
            }
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/cancelled-popup-request':
                    // User cancelled the popup, silently return
                    return;
                case 'auth/popup-closed-by-user':
                    console.warn('Popup was closed by the user. Please try again.');
                    break;
                case 'auth/account-exists-with-different-credential':
                    console.error('An account already exists with the same email address but different sign-in credentials.');
                    break;
                case 'auth/operation-not-allowed':
                    console.error('Operation not allowed. Please enable Google sign-in in the Firebase console.');
                    break;
                case 'auth/unauthorized-domain':
                    console.error('Unauthorized domain. Please make sure your domain is authorized in the Firebase console.');
                    break;
                default:
                    console.error('[Auth error]:', error);
                    break;
            }
        });
};