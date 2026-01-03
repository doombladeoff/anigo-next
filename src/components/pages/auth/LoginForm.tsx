'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Mail } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

const profileFormSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть минимум 6 символов").max(30, "Пароль слишком длинный"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const onSubmit = async (data: ProfileFormValues) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
        const idToken = await userCred.user.getIdToken();

        const res = await fetch("/api/session", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
        if (res.ok) {
        } else {
            console.error(await res.text());
        }
    } catch (err) {
        console.error(err);
        alert("Ошибка входа");
    }
};

export default function LoginForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* EMAIL */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        className="pl-10"
                                        placeholder="you@example.com"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* PASSWORD */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        className="pl-10"
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold"
                >
                    {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                    Войти
                </Button>
            </form>
        </Form>

    )
}