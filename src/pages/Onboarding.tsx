import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [languages, setLanguages] = useState<string[]>(["Русский"]);
  const [roles, setRoles] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [normalizedSkills, setNormalizedSkills] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addLanguage = (lang: string) => {
    if (lang && !languages.includes(lang)) {
      setLanguages([...languages, lang]);
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter(l => l !== lang));
  };

  const toggleRole = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter(r => r !== role));
    } else if (roles.length < 3) {
      setRoles([...roles, role]);
    }
  };

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
    if (!name || roles.length === 0 || skills.length === 0) {
      toast({
        title: "Заполните форму",
        description: "Укажите имя, роли и навыки",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Анкета сохранена",
      description: "Данные успешно отправлены",
    });
  };

  const handleNormalize = () => {
    // Mock normalization
    const normalized = skills.map(s => s.toLowerCase().trim());
    setNormalizedSkills([...new Set(normalized)]);
    toast({
      title: "Навыки нормализованы",
      description: `Обработано ${normalized.length} навыков`,
    });
  };

  const targetRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "QA Engineer",
    "Product Manager",
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Анкета</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
              />
            </div>

            <div className="space-y-2">
              <Label>Языки</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {languages.map(lang => (
                  <Badge key={lang} variant="secondary" className="gap-1">
                    {lang}
                    <button onClick={() => removeLanguage(lang)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                {["Английский", "Немецкий"].map(lang => (
                  <Button
                    key={lang}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addLanguage(lang)}
                  >
                    + {lang}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Целевая роль (выберите 1-3)</Label>
              <div className="flex flex-wrap gap-2">
                {targetRoles.map(role => (
                  <Button
                    key={role}
                    type="button"
                    variant={roles.includes(role) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Текущие навыки</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Введите навык"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>Добавить</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Сохранить анкету</Button>
              <Button variant="outline" onClick={handleNormalize}>
                Оценить навыки
              </Button>
            </div>

            {normalizedSkills.length > 0 && (
              <div className="space-y-2 pt-4 border-t">
                <Label>Нормализованные навыки</Label>
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
          Перейти в Личный кабинет
        </Button>
      </div>
    </div>
  );
}
