import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Mic } from "lucide-react";

export default function Settings() {
  const [audioMode, setAudioMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Выход выполнен",
      description: "До встречи!",
    });
    setTimeout(() => navigate("/login"), 500);
  };

  const handleAudioToggle = (checked: boolean) => {
    setAudioMode(checked);
    toast({
      title: checked ? "Аудио-режим включен" : "Аудио-режим выключен",
      description: checked
        ? "Теперь вы можете отвечать голосом"
        : "Режим текстовых ответов активен",
    });
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Настройки</h1>
          <p className="text-muted-foreground">
            Управляйте параметрами приложения
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Режим интервью
            </CardTitle>
            <CardDescription>
              Выберите формат ответов на вопросы интервью
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="audio-mode" className="text-base">
                  Аудио-режим интервью (beta)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Отвечайте на вопросы голосом вместо текста
                </p>
              </div>
              <Switch
                id="audio-mode"
                checked={audioMode}
                onCheckedChange={handleAudioToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Профиль</CardTitle>
            <CardDescription>Информация об аккаунте</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Целевые роли</Label>
              <p className="text-sm text-muted-foreground">
                Frontend Developer, Full Stack Developer
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/onboarding")}>
              Редактировать анкету
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
            <CardDescription>
              Настройки уведомлений временно недоступны
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Функция в разработке
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Выход из аккаунта</CardTitle>
            <CardDescription>
              Выйти из приложения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
