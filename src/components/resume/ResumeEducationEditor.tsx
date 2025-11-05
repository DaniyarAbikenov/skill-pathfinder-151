import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResumeEducationEditor() {
    const { fields, updateField } = useResumeStore();
    const education = fields?.education || [];

    function addEducation() {
        updateField("education", [
            ...education,
            { institution: "", degree: "", year_start: 0, year_end: 0 },
        ]);
    }

    function update(index: number, key: string, value: any) {
        const updated = [...education];
        // @ts-ignore
        updated[index][key] = value;
        updateField("education", updated);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Label>Education</Label>
                <Button onClick={addEducation}>Add</Button>
            </div>

            {education.map((ed, i) => (
                <div key={i} className="border rounded p-4 space-y-3">
                    <Input
                        placeholder="Institution"
                        value={ed.institution}
                        onChange={(e) => update(i, "institution", e.target.value)}
                    />
                    <Input
                        placeholder="Degree"
                        value={ed.degree}
                        onChange={(e) => update(i, "degree", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            placeholder="Start year"
                            value={ed.year_start || ""}
                            onChange={(e) => update(i, "year_start", Number(e.target.value))}
                        />
                        <Input
                            placeholder="End year"
                            value={ed.year_end || ""}
                            onChange={(e) => update(i, "year_end", Number(e.target.value))}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
