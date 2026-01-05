import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GoogleSignButton from "@/components/pages/auth/GoogleSignButton";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-(--main-height)">
            <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold">Добро пожаловать</CardTitle>
                    <CardDescription>
                        Зарегистрируйтесь, чтобы продолжить
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Separator />
                    <GoogleSignButton />
                    <p className="text-center text-sm text-muted-foreground">
                        В данный момент регистрация доступна только через Google
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}