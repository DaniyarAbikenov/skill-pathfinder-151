import { useState } from "react";
import { startInterview } from "@/api/interview";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {MainLayout} from "@/components/layout/MainLayout.tsx";

export default function InterviewStart() {
    const navigate = useNavigate();
    const {
        setSessionId,
        setCurrentQuestion,
        addMessage,
        reset,
        setTotalQuestions,   // ✅ добавь
        setCurrentIndex
    } = useInterviewStore();

    const [company, setCompany] = useState("");
    const [job, setJob] = useState("");
    const [stack, setStack] = useState("");
    const [style, setStyle] = useState("theoretical");

    const [isLoading, setIsLoading] = useState(false);

    async function handleStart() {
        if (isLoading) return; // страховка от двойных кликов
        setIsLoading(true);

        try {
            reset();

            const data = await startInterview({
                company_description: company,
                job_description: job,
                tech_stack: stack,
                style,
            });

            setSessionId(data.session_id);
            setCurrentQuestion(data.question);

            addMessage({ role: "interviewer", text: data.question });

            navigate("/interview/session");
            setTotalQuestions(data.total_questions);
            setCurrentIndex(0);
        } finally {
            setIsLoading(false);

        }
    }

    return (
        <MainLayout>
            <div className="p-8 max-w-xl mx-auto space-y-4">
                <h1 className="text-2xl font-bold">Start Interview</h1>

                <Textarea
                    placeholder="Company description"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <Textarea
                    placeholder="Job description"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                />

                <Textarea
                    placeholder="Tech stack"
                    value={stack}
                    onChange={(e) => setStack(e.target.value)}
                />

                <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="theoretical">Theoretical</option>
                    <option value="practical">Practical</option>
                    <option value="mixed">Mixed</option>
                </select>

                <Button
                    className="w-full"
                    disabled={isLoading}
                    onClick={handleStart}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            Starting…
                        </div>
                    ) : (
                        "Start"
                    )}
                </Button>
            </div>
        </MainLayout>
    );
}
