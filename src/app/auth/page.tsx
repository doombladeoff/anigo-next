"use client";

import { auth, provider } from "@/lib/firebase";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileFormSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(2, "Пароль должен быть минимум 2 символа").max(30, "Пароль слишком длинный"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRedirect = async () => {
            const result = await getRedirectResult(auth);

            console.log(result)
            if (!result) return;

            const idToken = await result.user.getIdToken();

            await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            router.replace("/profile");
        };

        handleRedirect();
    }, [router]);

    const onSubmit = async (data: ProfileFormValues) => {
        setLoading(true);
        try {
            const userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
            const idToken = await userCred.user.getIdToken();

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            // const res = await fetch("/api/session", {
            //     method: "POST",
            //     headers: {
            //         Authorization: `Bearer ${idToken}`,
            //     },
            // });
            if (res.ok) {
                router.push("/profile");
                router.refresh();
            } else {
                console.error(await res.text());
            }
        } catch (err) {
            console.error(err);
            alert("Ошибка входа");
        } finally {
            setLoading(false);
        }
    };

    const loginWithGooglePopup = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const res = await fetch("/api/auth/session", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (res.ok) {
                router.push("/profile");
                router.refresh();
            } else {
                console.error(await res.text());
            }
        } catch (error) {
            console.error('[Auth error]:', error)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 light:bg-gray-50 p-4">
            <h1 className="text-3xl font-bold text-center">Вход в аккаунт</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 light:bg-white dark:bg-white/5 p-6 rounded-lg shadow-md">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Пароль" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Загрузка..." : "Войти"}
                    </Button>
                </form>
            </Form>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                <Button variant="outline" onClick={loginWithGooglePopup} className="flex-1">
                    Войти через Google
                </Button>
            </div>
        </div>
    );
}
