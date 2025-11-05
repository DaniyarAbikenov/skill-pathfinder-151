import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadResume } from "@/api/resume";
import { useResumeStore } from "@/store/resumeStore";

export default function Resume() {
    const [file, setFile] = useState<File | null>(null);
    const { toast } = useToast();
    const setResumeId = useResumeStore((s) => s.setResumeId);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast({
                    title: "Файл слишком большой",
                    description: "Максимальный размер 5 МБ",
                    variant: "destructive",
                });
                return;
            }
            setFile(selectedFile);
            toast({
                title: "Файл выбран",
                description: selectedFile.name,
            });
        }
    };

    async function handleUpload() {
        if (!file) return;

        try {
            const { resume_id } = await uploadResume(file);

            // сохраняем ID в Zustand
            setResumeId(resume_id);

            // переход на страницу редактирования
            navigate(`/resume/${resume_id}/edit`);
        } catch (err) {
            console.error(err);
            toast({
                title: "Ошибка загрузки",
                description: "Не удалось загрузить файл. Попробуйте снова.",
                variant: "destructive",
            });
        }
    }

    return (
        <MainLayout>
            <div className="p-6 max-w-xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Резюме</h1>
                    <p className="text-muted-foreground">
                        Загрузите PDF-файл резюме, чтобы начать его обработку
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
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                id="resume-upload"
                            />
                            <Label
                                htmlFor="resume-upload"
                                className="cursor-pointer flex flex-col items-center gap-2"
                            >
                                <FileText className="h-12 w-12 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Нажмите, чтобы выбрать PDF"}
                </span>
                                <span className="text-xs text-muted-foreground">
                  Только PDF, до 5 МБ
                </span>
                            </Label>
                        </div>

                        <Button
                            onClick={handleUpload}
                            disabled={!file}
                            className="w-full"
                        >
                            Продолжить
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
