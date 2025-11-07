import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { registerWithEmail } from "@/api/auth";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Register() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [showEmailInUseDialog, setShowEmailInUseDialog] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !password2) {
            toast({ title: t("common.error"), description: t("login.fillAll") ?? "Заполните все поля", variant: "destructive" });
            return;
        }
        if (password !== password2) {
            toast({ title: t("common.error"), description: t("register.passwordMismatch") ?? "Пароли не совпадают", variant: "destructive" });
            return;
        }
        if (password.length < 6) {
            toast({ title: t("common.error"), description: t("register.passwordWeak") ?? "Пароль должен быть не короче 6 символов", variant: "destructive" });
            return;
        }

        try {
            setSubmitting(true);
            await registerWithEmail(email, password);
            toast({ title: t("register.success"), description: t("login.redirect") });
            navigate("/onboarding");
        } catch (err: any) {
            console.error("Registration error:", err);
            
            // Проверяем код ошибки Firebase
            if (err?.code === "auth/email-already-in-use" || err?.message?.includes("email-already-in-use")) {
                // Показываем диалог с предложением войти
                setShowEmailInUseDialog(true);
            } else {
                // Показываем общую ошибку
                toast({ 
                    title: t("common.error"), 
                    description: err?.message ?? t("register.error"), 
                    variant: "destructive" 
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="absolute top-4 right-4"><LanguageSwitcher /></div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{t("register.title") ?? "Регистрация"}</CardTitle>
                    <CardDescription>{t("register.subtitle") ?? `Создайте новый аккаунт ${t("app.name")}`}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("login.email") ?? "Email"}</Label>
                            <Input id="email" type="email" placeholder="you@email.com" value={email}
                                   onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t("login.password") ?? "Пароль"}</Label>
                            <Input id="password" type="password" placeholder="••••••••" value={password}
                                   onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password2">{t("register.confirmPassword") ?? "Подтверждение пароля"}</Label>
                            <Input id="password2" type="password" placeholder="••••••••" value={password2}
                                   onChange={(e) => setPassword2(e.target.value)} />
                        </div>

                        <Button type="submit" className="w-full" disabled={submitting}>
                            {t("register.submit") ?? "Зарегистрироваться"}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">{t("register.haveAccount") ?? "Уже есть аккаунт?"} </span>
                            <Link to="/login" className="text-primary hover:underline">
                                {t("login.signIn") ?? "Войти"}
                            </Link>
                        </div>

                        <div className="text-center text-sm">
                            <Link to="/legal/policies" className="text-muted-foreground hover:text-primary">
                                {t("login.policies") ?? "Политики и условия"}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Диалог для случая, когда email уже используется */}
            <AlertDialog open={showEmailInUseDialog} onOpenChange={setShowEmailInUseDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("register.emailInUse")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("register.emailInUseDesc")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => navigate("/login")}>
                            {t("register.goToLogin")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
