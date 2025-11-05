import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (email && password) {
      toast({
        title: isLogin ? "Вход выполнен" : "Регистрация завершена",
        description: "Перенаправление...",
      });
      setTimeout(() => navigate("/onboarding"), 500);
    } else {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Вход в систему" : "Регистрация"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Войдите в свой аккаунт CareerBoost" 
              : "Создайте новый аккаунт CareerBoost"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>

            <Button type="button" variant="outline" className="w-full">
              Войти через Google
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
                Политика конфиденциальности
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
