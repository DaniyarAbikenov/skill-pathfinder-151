import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResume, updateResumeFields, parseResume } from "@/api/resume";
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
    const { fields, setFields } = useResumeStore();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!resumeId) return;

            // ✅ 1. Берём резюме
            const resume = await getResume(resumeId);

            // ✅ 2. Если ещё не было извлечения — запускаем парсинг
            if (!resume.fields_extracted && resume.gs_url) {
                const parsed = await parseResume(resumeId);
                setFields(parsed.fields);
            } else {
                setFields(resume.fields_verified || resume.fields_extracted || {});
            }


            setLoading(false);
        }
        load();
    }, [resumeId]);

    async function handleSave() {
        await updateResumeFields(resumeId!, fields);
        navigate(`/resume/${resumeId}/improve`);
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
                <h1 className="text-2xl font-bold">Edit Resume Fields</h1>

                <div className="space-y-8">
                    <ResumeSummaryEditor />
                    <ResumeSkillsEditor />
                    <ResumeExperienceEditor />
                    <ResumeEducationEditor />
                    <ResumeProjectsEditor />
                </div>

                <Button onClick={handleSave} className="w-full mt-4">
                    Continue
                </Button>
            </div>
        </MainLayout>
    );
}
