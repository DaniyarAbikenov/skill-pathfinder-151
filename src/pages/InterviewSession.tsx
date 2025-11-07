import { useState } from "react";
import { useInterviewStore } from "@/store/useInterviewStore";
import { answerInterview } from "@/api/interview";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

export default function InterviewSession() {
    const navigate = useNavigate();
    const {
        sessionId,
        currentQuestion,
        messages,
        addMessage,
        setResult,
        finished
    } = useInterviewStore();

    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    if (!sessionId) return <div>No active interview</div>;

    async function send() {
        if (loading || !answer.trim()) return;

        addMessage({ role: "user", text: answer });
        const userAnswer = answer;
        setAnswer("");
        setLoading(true);

        const res = await answerInterview(sessionId, userAnswer);

        setResult({
            finished: res.finished,
            feedback: res.feedback,
            followUp: res.follow_up,
            nextQuestion: res.next_question
        });

        if (res.finished) {
            navigate("/interview/result");
        }

        setLoading(false);
    }

    return (
        <MainLayout>
            <div className="p-8 max-w-2xl mx-auto space-y-4">
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
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Your answer…"
                            disabled={loading}
                        />
                        <Button disabled={loading || !answer.trim()} onClick={send}>
                            {loading ? "…" : "Send"}
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
