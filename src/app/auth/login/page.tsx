import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/pages/auth/LoginForm";

import GoogleSignButton from "@/components/pages/auth/GoogleSignButton";
import Link from "next/link";

export default async function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-(--main-height)">
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
                    <GoogleSignButton />
                    <p className="text-center text-sm text-muted-foreground">
                        Нет аккаунта?{" "}
                        <Link
                            href="/auth/register"
                            className="text-primary font-medium hover:underline"
                        >
                            Зарегистрироваться
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
