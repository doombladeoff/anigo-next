"use client";

import { Button } from "@/components/ui/button";
import { loginWithGooglePopup } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function GoogleSignButton() {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            onClick={() => loginWithGooglePopup().then(() => router.replace("/"))}
            className="w-full h-11 gap-2"
        >
            <img src="/google.svg" alt="Google" className="h-5 w-5" />
            Войти через Google
        </Button>
    );
}