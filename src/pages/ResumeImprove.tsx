import { useState } from "react";
import { useParams } from "react-router-dom";
import { improveResume } from "@/api/resume";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

export default function ResumeImprove() {
    const { resumeId } = useParams();
    const [jdText, setJdText] = useState("");
    const [loading, setLoading] = useState(false);
    const [improvements, setImprovements] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function handleAnalyze() {
        setLoading(true);
        setError(null);

        try {
            const resp = await improveResume(resumeId!, jdText);
            setImprovements(resp.improvements);
        } catch (e: any) {
            setError(e?.response?.data?.detail || "Error analyzing resume");
        } finally {
            setLoading(false);
        }
    }

    return (
        <MainLayout>
            <div className="p-8 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold">Improve Resume</h1>

                {/* 🔹 Ввод JD */}
                <div className="space-y-2">
                    <label className="font-semibold">Job Description</label>
                    <textarea
                        className="w-full border rounded p-3 h-40"
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        placeholder="Paste job description here..."
                    />
                </div>

                {/* 🔹 Кнопка Continue */}
                <Button onClick={handleAnalyze} disabled={loading}>
                    {loading ? "Analyzing..." : "Continue"}
                </Button>

                {/* 🔹 Ошибка */}
                {error && <div className="text-red-600">{error}</div>}

                {/* 🔹 Список улучшений */}
                {improvements.length > 0 && (
                    <div className="space-y-6 mt-8">
                        <h2 className="text-xl font-semibold">Suggested Improvements</h2>

                        {improvements.map((impr) => (
                            <div
                                key={impr.id}
                                className="border rounded p-4 space-y-2 bg-white"
                            >
                                <div className="font-bold">Section: {impr.section}</div>
                                <div className="text-sm text-gray-600">
                                    Type: {impr.change_type}
                                </div>

                                {impr.before && (
                                    <div>
                                        <div className="text-gray-500 text-sm">Before:</div>
                                        <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                                            {impr.before}
                                        </pre>
                                    </div>
                                )}

                                {impr.after && (
                                    <div>
                                        <div className="text-gray-500 text-sm">After:</div>
                                        <pre className="bg-gray-50 p-2 rounded text-sm whitespace-pre-wrap">
                                            {impr.after}
                                        </pre>
                                    </div>
                                )}

                                <div className="text-sm">
                                    <span className="font-semibold">Reason:</span>{" "}
                                    {impr.reason}
                                </div>
                            </div>
                        ))}

                        {/* Кнопка Generate PDF */}
                        <Button
                            className="w-full mt-4"
                            onClick={() =>
                                alert("PDF generation will be implemented next.")
                            }
                        >
                            Generate PDF (Coming next)
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
