import { create } from "zustand";
import { ResumeFields } from "@/types/resume";

interface ResumeState {
    resumeId: string | null;
    fields: ResumeFields | null;

    setResumeId: (id: string) => void;
    setFields: (fields: ResumeFields) => void;

    updateField: (key: keyof ResumeFields, value: any) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
    resumeId: null,
    fields: null,

    setResumeId: (id) => set({ resumeId: id }),
    setFields: (fields) => set({ fields }),

    updateField: (key, value) =>
        set((state) => ({
            fields: {
                ...state.fields!,
                [key]: value,
            },
        })),
}));
