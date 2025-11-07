import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Play } from "lucide-react";

export default function Interview() {
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStart = () => {
    if (!role) {
      toast({
        title: t("interview.selectRoleError"),
        description: t("interview.selectRoleErrorDesc"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("interview.startingPractice"),
      description: t("interview.loadingQuestions"),
    });

    setTimeout(() => navigate("/interview/session/s_demo"), 500);
  };

  const roles = [
    "Frontend Intern",
    "Frontend Junior",
    "Frontend Middle",
    "Backend Junior",
    "Full Stack Junior",
    "QA Engineer",
  ];

  return (
    <MainLayout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("interview.title")}</h1>
          <p className="text-muted-foreground">
            {t("interview.subtitle")}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t("interview.start")}
            </CardTitle>
            <CardDescription>
              {t("interview.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">{t("interview.selectRole")}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder={t("interview.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(r => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleStart} className="w-full" size="lg">
              <Play className="h-4 w-4 mr-2" />
              {t("interview.start")}
            </Button>

            <div className="pt-4 border-t space-y-2">
              <h4 className="text-sm font-medium">{t("interview.whatToExpect")}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t("interview.technicalQuestions")}</li>
                <li>• {t("interview.textFormat")}</li>
                <li>• {t("interview.detailedFeedback")}</li>
                <li>• {t("interview.improvements")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("interview.history")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between items-center py-2 border-b">
                <span>Frontend Junior - 15.01.2025</span>
                <span className="font-medium text-foreground">{t("interview.score")}: 74</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>Frontend Intern - 10.01.2025</span>
                <span className="font-medium text-foreground">{t("interview.score")}: 68</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
