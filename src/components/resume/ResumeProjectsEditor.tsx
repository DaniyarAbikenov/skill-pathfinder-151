import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ResumeProjectsEditor() {
    const { fields, updateField } = useResumeStore();
    const projects = fields?.projects || [];

    function addProject() {
        updateField("projects", [
            ...projects,
            { title: "", description: "", tech: [] },
        ]);
    }

    function update(index: number, key: string, value: any) {
        const updated = [...projects];
        // @ts-ignore
        updated[index][key] = value;
        updateField("projects", updated);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Label>Projects</Label>
                <Button onClick={addProject}>Add</Button>
            </div>

            {projects.map((p, i) => (
                <div key={i} className="border rounded p-4 space-y-3">
                    <Input
                        placeholder="Project Title"
                        value={p.title}
                        onChange={(e) => update(i, "title", e.target.value)}
                    />

                    <Textarea
                        rows={3}
                        placeholder="Description"
                        value={p.description}
                        onChange={(e) => update(i, "description", e.target.value)}
                    />

                    <Input
                        placeholder="Tech stack (comma-separated)"
                        value={(p.tech || []).join(", ")}
                        onChange={(e) =>
                            update(i, "tech", e.target.value.split(",").map((s) => s.trim()))
                        }
                    />
                </div>
            ))}
        </div>
    );
}
