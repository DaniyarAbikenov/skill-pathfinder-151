import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResume, improveResume } from "@/api/resume";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

import { ResumeSummaryEditor } from "@/components/resume/ResumeSummaryEditor";
import { ResumeSkillsEditor } from "@/components/resume/ResumeSkillsEditor";
import { ResumeEducationEditor } from "@/components/resume/ResumeEducationEditor";
import { ResumeExperienceEditor } from "@/components/resume/ResumeExperienceEditor";
import { ResumeProjectsEditor } from "@/components/resume/ResumeProjectsEditor";

export default function ResumeEdit() {
    const { resumeId } = useParams();
    const navigate = useNavigate();

    const { fields, setFields, jdText, setJdText } = useResumeStore();

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            if (!resumeId) return;

            const resume = await getResume(resumeId);

            // ✅ загруженные поля
            setFields(resume.fields || {});

            // ✅ URL оригинального PDF
            if (resume.gs_url) {
                const publicUrl = resume.gs_url.replace(
                    "gs://careerbot-uploads/",
                    "https://storage.googleapis.com/careerbot-uploads/"
                );
                setPdfUrl(publicUrl);
            }

            setLoading(false);
        }
        load();
    }, [resumeId]);

    async function handleContinue() {
        if (isSubmitting) return;       // защита от двойного клика
        setIsSubmitting(true);

        try {
            const result = await improveResume(resumeId!, jdText);

            useResumeStore.getState().setImprovements(result.improvements);

            navigate(`/resume/${resumeId}/improvements`);
        } finally {
            setIsSubmitting(false);
        }
    }
    if (loading)
        return (
            <MainLayout>
                <div className="p-8 text-center">Loading…</div>
            </MainLayout>
        );

    return (
        <MainLayout>
            <div className="p-8 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold">Edit Resume</h1>

                {/* ✅ ссылка на оригинальный PDF */}
                {pdfUrl && (
                    <a
                        href={pdfUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                    >
                        Open original PDF
                    </a>
                )}

                {/* ✅ блок редакторов */}
                <div className="space-y-8">
                    <ResumeSummaryEditor />
                    <ResumeSkillsEditor />
                    <ResumeExperienceEditor />
                    <ResumeEducationEditor />
                    <ResumeProjectsEditor />
                </div>

                {/* ✅ поле для текста вакансии */}
                <div className="space-y-2">
                    <label className="font-medium text-sm">Job Description</label>
                    <textarea
                        className="w-full p-3 border rounded-md h-40"
                        placeholder="Paste the job description here…"
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                    />
                </div>

                {/* ✅ кнопка перехода к улучшениям */}
                <Button
                    onClick={handleContinue}
                    className="w-full mt-6 text-lg py-6"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            Processing…
                        </div>
                    ) : (
                        "Continue → Get Recommendations"
                    )}
                </Button>
            </div>
        </MainLayout>
    );
}
