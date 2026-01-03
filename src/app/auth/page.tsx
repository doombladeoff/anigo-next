"use client";

import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { loginWithGooglePopup } from "@/lib/firebase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/pages/auth/LoginForm";
import { createUser } from "@/lib/firebase/create-user";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        let unsub: (() => void) | null = null;

        const run = async () => {
            unsub = auth.onAuthStateChanged(async (user) => {
                if (!user) return;

                // 👇 redirect успешно отработал
                const idToken = await user.getIdToken();

                const res = await fetch("/api/auth/session", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });

                if (res.ok) {
                    await createUser(user);
                    router.replace("/");
                } else {
                    console.error(await res.text());
                }
            });
        };

        run();

        return () => unsub?.();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center from-black via-zinc-900 to-black px-4">
            <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold">Добро пожаловать</CardTitle>
                    <CardDescription>
                        Войдите в аккаунт, чтобы продолжить
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <LoginForm />
                    <Separator />

                    {/* GOOGLE */}
                    <Button
                        variant="outline"
                        onClick={async () => await loginWithGooglePopup()}
                        className="w-full h-11 gap-2"
                    >
                        <img src="/google.svg" alt="Google" className="h-5 w-5" />
                        Войти через Google
                    </Button>

                    {/* REGISTER */}
                    <p className="text-center text-sm text-muted-foreground">
                        Нет аккаунта?{" "}
                        <button
                            onClick={() => router.push("/register")}
                            className="text-primary font-medium hover:underline"
                        >
                            Зарегистрироваться
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
