import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ResumeSummaryEditor() {
    const { fields, updateField } = useResumeStore();

    return (
        <div className="space-y-2">
            <Label>Professional Summary</Label>
            <Textarea
                rows={5}
                value={fields?.summary || ""}
                onChange={(e) => updateField("summary", e.target.value)}
                placeholder="Short introduction about yourself..."
            />
        </div>
    );
}
