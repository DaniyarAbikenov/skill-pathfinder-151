import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecommendations } from "@/api/resume";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ResumeImprove() {
    const { resumeId } = useParams();
    const { recommendations, setRecommendations } = useResumeStore();
    const [jd, setJd] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    async function handleAnalyze() {
        const rec = await getRecommendations(resumeId!, { jd, company });
        setRecommendations(rec);
    }

    function apply() {
        navigate(`/resume/${resumeId}/generate`);
    }

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Improve Resume</h1>

            <Input
                placeholder="Company URL"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <Textarea
                placeholder="Paste job description"
                rows={10}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
            />

            <Button className="w-full" onClick={handleAnalyze}>
                Analyze
            </Button>

            {recommendations && (
                <div className="mt-6">
                    <pre>{JSON.stringify(recommendations, null, 2)}</pre>

                    <Button className="w-full mt-4" onClick={apply}>
                        Apply Recommendations
                    </Button>
                </div>
            )}
        </div>
    );
}
