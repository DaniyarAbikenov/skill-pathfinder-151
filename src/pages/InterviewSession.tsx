import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

export default function InterviewSession() {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const { toast } = useToast();

  const questions = [
    "Расскажите о себе и своем опыте в разработке.",
    "Что такое замыкание в JavaScript? Приведите пример.",
    "Объясните разницу между let, const и var.",
    "Что такое виртуальный DOM в React и как он работает?",
    "Расскажите о методе STAR для ответов на поведенческие вопросы.",
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      toast({
        title: "Не все вопросы отвечены",
        description: `Отвечено ${answeredCount} из ${questions.length}`,
        variant: "destructive",
      });
      return;
    }

    setFinished(true);
    toast({
      title: "Тренировка завершена",
      description: "Анализируем ваши ответы...",
    });
  };

  const mockFeedback = {
    score: 74,
    strengths: [
      "Структурированные ответы по методу STAR",
      "Четкие примеры из опыта",
      "Хорошая техническая терминология",
    ],
    improvements: [
      "Добавить конкретные метрики достижений",
      "Сократить вводную часть ответов",
      "Меньше использовать технический жаргон",
      "Четче формулировать итоговый результат",
      "Добавить примеры командной работы",
    ],
    examples: [
      "«Сократил время загрузки страницы на 30%»",
      "«Увеличил конверсию формы с 2% до 5%»",
      "«Настроил CI/CD, уменьшив время деплоя с 30 до 5 минут»",
    ],
    resources: [
      { title: "STAR Method Guide", url: "https://example.com/star" },
      { title: "React Interview Questions", url: "https://example.com/react" },
      { title: "Algorithm Practice", url: "https://example.com/algo" },
    ],
  };

  if (finished) {
    return (
      <MainLayout>
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Тренировка завершена!</h1>
            <p className="text-muted-foreground">Вот ваш детальный фидбек</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t("interview.session.feedback.score")}</span>
                <Badge variant="default" className="text-2xl px-4 py-2">
                  {mockFeedback.score}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-success">{t("interview.session.feedback.strengths")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockFeedback.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-warning">{t("interview.session.feedback.improvements")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockFeedback.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("interview.session.feedback.examples")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFeedback.examples.map((example, i) => (
                  <div key={i} className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{example}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("interview.session.feedback.resources")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFeedback.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-medium text-primary hover:underline">
                      {resource.title}
                    </span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => window.location.href = "/interview"} className="w-full">
            Начать новую тренировку
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Тренировка</h1>
          <Badge variant="outline">
            {t("interview.session.question")} {currentQuestion + 1} из {questions.length}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {questions[currentQuestion]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={answers[currentQuestion] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={t("interview.session.answerPlaceholder")}
              rows={10}
              className="resize-none"
            />

            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("interview.session.prev")}
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleFinish}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t("interview.session.finish")}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {t("interview.session.next")}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Прогресс ответов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    answers[i] ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
