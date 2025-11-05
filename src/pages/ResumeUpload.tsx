import { useState } from "react";
import { uploadResume } from "@/api/resume";
import { useResumeStore } from "@/store/resumeStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResumeUpload() {
    const [file, setFile] = useState<File | null>(null);
    const { setResumeId } = useResumeStore();
    const navigate = useNavigate();

    async function handleUpload() {
        if (!file) return;

        const { resume_id } = await uploadResume(file);

        setResumeId(resume_id);

        navigate(`/resume/${resume_id}/edit`);
    }

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Upload Resume</h1>

            <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <Button className="mt-4 w-full" onClick={handleUpload} disabled={!file}>
                Upload
            </Button>
        </div>
    );
}
