import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MultiSelect } from "@/components/MultiSelect";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LANGUAGES } from "@/data/languages";
import { getAllRoles } from "@/data/roles";

export default function Onboarding() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [normalizedSkills, setNormalizedSkills] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = () => {
    if (!name || selectedRoles.length === 0 || skills.length === 0) {
      toast({
        title: t("common.error"),
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("common.success"),
      description: "Анкета сохранена",
    });
  };

  const handleNormalize = () => {
    const normalized = skills.map(s => s.toLowerCase().trim());
    setNormalizedSkills([...new Set(normalized)]);
    toast({
      title: t("onboarding.normalizedSkills"),
      description: `Обработано ${normalized.length} навыков`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="relative">
          <div className="absolute top-4 right-4 z-10">
            <LanguageSwitcher />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">{t("onboarding.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("onboarding.subtitle")}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t("onboarding.name")}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("onboarding.name")}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("onboarding.languages")}</Label>
              <MultiSelect
                options={LANGUAGES}
                selected={selectedLanguages}
                onChange={setSelectedLanguages}
                placeholder={t("onboarding.languagesPlaceholder")}
                allowCustom={false}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("onboarding.targetRoles")}</Label>
              <MultiSelect
                options={getAllRoles()}
                selected={selectedRoles}
                onChange={setSelectedRoles}
                placeholder={t("onboarding.targetRolesPlaceholder")}
                allowCustom={true}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("onboarding.currentSkills")}</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder={t("onboarding.currentSkillsPlaceholder")}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>+</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)}>×</button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>{t("onboarding.save")}</Button>
              <Button variant="outline" onClick={handleNormalize}>
                {t("onboarding.evaluateSkills")}
              </Button>
            </div>

            {normalizedSkills.length > 0 && (
              <div className="space-y-2 pt-4 border-t">
                <Label>{t("onboarding.normalizedSkills")}</Label>
                <div className="flex flex-wrap gap-2">
                  {normalizedSkills.map(skill => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Button onClick={() => navigate("/dashboard")} className="w-full">
          {t("onboarding.toDashboard")}
        </Button>
      </div>
    </div>
  );
}
