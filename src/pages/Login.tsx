import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: isLogin ? "Вход выполнен" : "Регистрация завершена",
        description: "Перенаправление...",
      });
      setTimeout(() => navigate("/onboarding"), 500);
    } else {
      toast({
        title: t("common.error"),
        description: "Заполните все поля",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? t("login.title") : "Регистрация"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? `${t("app.name")} - ${t("app.tagline")}`
              : `Создайте новый аккаунт ${t("app.name")}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? t("login.signIn") : "Зарегистрироваться"}
            </Button>

            <Button type="button" variant="outline" className="w-full">
              {t("login.signInGoogle")}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin 
                  ? "Нет аккаунта? Зарегистрируйтесь" 
                  : "Уже есть аккаунт? Войдите"
                }
              </button>
            </div>

            <div className="text-center text-sm">
              <Link to="/legal/policies" className="text-muted-foreground hover:text-primary">
                {t("login.policies")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
