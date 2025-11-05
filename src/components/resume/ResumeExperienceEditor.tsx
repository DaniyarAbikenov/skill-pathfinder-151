import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ResumeExperienceEditor() {
    const { fields, updateField } = useResumeStore();
    const experience = fields?.experience || [];

    function addExperience() {
        updateField("experience", [
            ...experience,
            {
                company: "",
                role: "",
                date_from: "",
                date_to: "",
                achievements: [],
            },
        ]);
    }

    function update(index: number, key: string, value: any) {
        const updated = [...experience];
        // @ts-ignore
        updated[index][key] = value;
        updateField("experience", updated);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Label>Work Experience</Label>
                <Button onClick={addExperience}>Add Experience</Button>
            </div>

            {experience.map((exp, i) => (
                <div key={i} className="border rounded p-4 space-y-3">
                    <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => update(i, "company", e.target.value)}
                    />

                    <Input
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => update(i, "role", e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            placeholder="From (2021-01)"
                            value={exp.date_from}
                            onChange={(e) => update(i, "date_from", e.target.value)}
                        />
                        <Input
                            placeholder="To (2023-03)"
                            value={exp.date_to}
                            onChange={(e) => update(i, "date_to", e.target.value)}
                        />
                    </div>

                    <Textarea
                        rows={3}
                        placeholder="Achievements (comma-separated)"
                        value={(exp.achievements || []).join(", ")}
                        onChange={(e) =>
                            update(i, "achievements", e.target.value.split(",").map((s) => s.trim()))
                        }
                    />
                </div>
            ))}
        </div>
    );
}
