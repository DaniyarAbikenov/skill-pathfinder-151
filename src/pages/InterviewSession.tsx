import { useState } from "react";
import { useInterviewStore } from "@/store/useInterviewStore";
import { answerInterview } from "@/api/interview";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout.tsx";

export default function InterviewSession() {
  const navigate = useNavigate();

  const {
    sessionId,
    messages,
    addMessage,
    currentQuestion,
    setCurrentQuestion,
    finished,
    setFinished,
    totalQuestions,          // ✅ добавлено
    currentIndex,            // ✅ добавлено
    setCurrentIndex          // ✅ добавлено
  } = useInterviewStore();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!sessionId || !currentQuestion) return;

    addMessage({ role: "user", text: input });

    const userAnswer = input;
    setInput("");
    setLoading(true);

    const res = await answerInterview(sessionId, userAnswer);

    // ✅ показываем правильный ответ
    addMessage({
      role: "interviewer",
      text: `Correct answer: ${res.correct_answer}`
    });

    // ✅ если интервью закончено
    if (res.finished) {
      setFinished(true);
      navigate("/interview/result");
      return;
    }

    // ✅ следующий вопрос
    addMessage({ role: "interviewer", text: res.next_question });

    setCurrentQuestion(res.next_question);

    // ✅ увеличиваем индекс текущего вопроса
    setCurrentIndex(currentIndex + 1);

    setLoading(false);
  }

  return (
      <MainLayout>
        <div className="p-8 max-w-2xl mx-auto space-y-4 relative">

          {/* ✅ Индикатор прогресса в углу */}
          <div className="absolute top-4 right-4 text-sm text-gray-600 font-medium">
            Question {currentIndex + 1} / {totalQuestions}
          </div>

          <h1 className="text-xl font-bold">Interview</h1>

          <div className="border rounded p-4 space-y-3 h-[60vh] overflow-y-auto bg-white">
            {messages.map((m, i) => (
                <div
                    key={i}
                    className={m.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                      className={`inline-block px-3 py-2 rounded-lg ${
                          m.role === "user" ? "bg-blue-200" : "bg-gray-200"
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
            ))}
          </div>

          {!finished && (
              <div className="flex gap-2">
                <input
                    className="flex-1 border rounded p-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Your answer…"
                    disabled={loading}
                />
                <Button disabled={loading || !input.trim()} onClick={send}>
                  {loading ? "..." : "Send"}
                </Button>
              </div>
          )}
        </div>
      </MainLayout>
  );
}
