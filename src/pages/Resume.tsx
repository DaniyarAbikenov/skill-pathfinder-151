import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Resume() {
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState(false);
  const [jdText, setJdText] = useState("");
  const [jdAnalyzed, setJdAnalyzed] = useState(false);
  const [showTuneDialog, setShowTuneDialog] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "Файл слишком большой",
          description: "Размер файла не должен превышать 5 МБ",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      toast({
        title: "Файл загружен",
        description: selectedFile.name,
      });
    }
  };

  const handleParse = () => {
    setParsed(true);
    toast({
      title: "Резюме распознано",
      description: "Данные успешно извлечены",
    });
  };

  const handleAnalyzeJD = () => {
    if (!jdText) {
      toast({
        title: "Введите текст вакансии",
        variant: "destructive",
      });
      return;
    }
    setJdAnalyzed(true);
    toast({
      title: "JD проанализировано",
      description: "Ключевые навыки определены",
    });
  };

  const mockResumeData = {
    name: "Иван Петров",
    contacts: "ivan@email.com, +7 (999) 123-45-67",
    experience: [
      "Frontend Developer в Tech Corp (2020-2023)",
      "Junior Developer в StartupXYZ (2019-2020)",
    ],
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
    weaknesses: [
      "Недостаточно опыта с TypeScript generics",
      "Не указаны метрики достижений",
      "Слабое описание проектов",
    ],
  };

  const mockJDKeywords = [
    "React", "TypeScript", "REST API", "Unit Testing", "Git", "Agile"
  ];

  const mockTunedResume = {
    before: "Frontend Developer с опытом работы в React. Разрабатывал компоненты и работал с API.",
    after: "Frontend Developer с 3+ годами опыта в React и TypeScript. Разработал более 50 переиспользуемых компонентов, интегрировал 15+ REST API endpoints, написал 200+ unit тестов. Применял Agile-методологии, работал с Git flow.",
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Резюме</h1>
          <p className="text-muted-foreground">
            Загрузите, проанализируйте и адаптируйте резюме под вакансии
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Загрузка резюме
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FileText className="h-12 w-12 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Перетащите файл или нажмите для выбора"}
                </span>
                <span className="text-xs text-muted-foreground">
                  PDF или DOCX, до 5 МБ
                </span>
              </Label>
            </div>

            {file && !parsed && (
              <Button onClick={handleParse} className="w-full">
                Распознать резюме
              </Button>
            )}
          </CardContent>
        </Card>

        {parsed && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Распознанные данные</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">ФИО</Label>
                  <p className="text-sm">{mockResumeData.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Контакты</Label>
                  <p className="text-sm">{mockResumeData.contacts}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Опыт</Label>
                  <ul className="text-sm space-y-1">
                    {mockResumeData.experience.map((exp, i) => (
                      <li key={i}>• {exp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label className="text-sm font-medium">Навыки</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mockResumeData.skills.map(skill => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-warning">Слабые места</Label>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {mockResumeData.weaknesses.map((weak, i) => (
                      <li key={i}>• {weak}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Адаптация под вакансию</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jd">Текст вакансии (JD)</Label>
                  <Textarea
                    id="jd"
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Вставьте описание вакансии..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <Button onClick={handleAnalyzeJD} variant="outline" className="w-full">
                  Анализировать JD
                </Button>

                {jdAnalyzed && (
                  <div className="space-y-2 pt-2">
                    <Label className="text-sm font-medium">Ключевые навыки из JD</Label>
                    <div className="flex flex-wrap gap-2">
                      {mockJDKeywords.map(keyword => (
                        <Badge key={keyword} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {jdAnalyzed && (
                  <Dialog open={showTuneDialog} onOpenChange={setShowTuneDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Переписать под вакансию
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Адаптированное резюме</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="after">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="before">До</TabsTrigger>
                          <TabsTrigger value="after">После</TabsTrigger>
                        </TabsList>
                        <TabsContent value="before" className="space-y-4">
                          <Textarea
                            value={mockTunedResume.before}
                            readOnly
                            rows={8}
                          />
                        </TabsContent>
                        <TabsContent value="after" className="space-y-4">
                          <Textarea
                            value={mockTunedResume.after}
                            readOnly
                            rows={8}
                            className="border-primary"
                          />
                          <div className="flex gap-2">
                            <Button className="flex-1">Скачать</Button>
                            <Button variant="outline" className="flex-1">
                              Сохранить версию
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
}
