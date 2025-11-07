import { useEffect, useState } from "react";
import { useInterviewStore } from "@/store/useInterviewStore";
import { getInterviewSummary } from "@/api/interview";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function InterviewSummary() {
    const navigate = useNavigate();
    const { sessionId, summary, setSummary, reset } = useInterviewStore();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) return;

        async function load() {
            setLoading(true);
            const result = await getInterviewSummary(sessionId);
            setSummary(result);
            setLoading(false);
        }

        load();
    }, [sessionId]);

    if (!sessionId) {
        return (
        <MainLayout>
            <div>No active interview</div>
        </MainLayout>);
    }

    if (loading || !summary) {
        return (
            <MainLayout>
                <div className="p-8 text-center">Loading summary…</div>
            </MainLayout>
        );
    }

    const { correct, partial, wrong, summary: s } = summary;

    return (
        <MainLayout>
            <div className="p-8 max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Interview Summary</h1>

                {/* ✅ Статистика */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-green-100 rounded">
                        <div className="text-2xl font-bold">{correct}</div>
                        <div className="text-sm">Correct</div>
                    </div>


                    <div className="p-4 bg-red-100 rounded">
                        <div className="text-2xl font-bold">{wrong}</div>
                        <div className="text-sm">Wrong</div>
                    </div>
                </div>

                {/* ✅ Общий summary */}
                <div className="p-4 bg-gray-50 rounded shadow">
                    <h2 className="font-bold text-xl mb-2">Overall Summary</h2>
                    <p>{s.summary}</p>
                </div>

                {/* ✅ Сильные стороны */}
                <div className="p-4 bg-green-50 rounded shadow">
                    <h2 className="font-bold text-xl mb-2">Strengths</h2>
                    <ul className="list-disc ml-5 space-y-1">
                        {s.strengths.map((st, i) => (
                            <li key={i}>{st}</li>
                        ))}
                    </ul>
                </div>

                {/* ✅ Слабые стороны */}
                <div className="p-4 bg-red-50 rounded shadow">
                    <h2 className="font-bold text-xl mb-2">Weaknesses</h2>
                    <ul className="list-disc ml-5 space-y-1">
                        {s.weaknesses.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}
                    </ul>
                </div>

                {/* ✅ Рекомендации */}
                <div className="p-4 bg-blue-50 rounded shadow">
                    <h2 className="font-bold text-xl mb-2">Recommendations</h2>
                    <ul className="list-disc ml-5 space-y-1">
                        {s.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                        ))}
                    </ul>
                </div>

                {/* ✅ Уровень */}
                <div className="p-4 bg-purple-50 rounded shadow">
                    <h2 className="font-bold text-xl mb-2">Estimated Level</h2>
                    <p className="font-bold">{s.estimated_level}</p>
                </div>

                {/* ✅ Кнопки */}
                <div className="flex gap-4 justify-center pt-6">
                    <Button
                        onClick={() => {
                            reset();
                            navigate("/interview/start");
                        }}
                    >
                        Restart interview
                    </Button>

                    <Button variant="secondary" onClick={() => navigate("/")}>
                        Back to Home
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}
