import { useState } from "react";
import { useParams } from "react-router-dom";
import { generateResume } from "@/api/resume";
import { Button } from "@/components/ui/button";

export default function ResumeGenerate() {
    const { resumeId } = useParams();
    const [template, setTemplate] = useState("modern");
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    async function handleGenerate() {
        const data = await generateResume(resumeId!, template);
        setPdfUrl(data.pdf_url);
    }

    return (
        <div className="p-8 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Generate Resume</h1>

            <select
                className="border p-2 rounded w-full"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
            >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimalist">Minimalist</option>
            </select>

            <Button className="w-full" onClick={handleGenerate}>
                Generate PDF
            </Button>

            {pdfUrl && (
                <a href={pdfUrl} target="_blank" className="block text-blue-600 underline text-center">
                    Download PDF
                </a>
            )}
        </div>
    );
}
