import { create } from "zustand";

interface Message {
    role: string;
    text: string;
}

interface InterviewStore {
    sessionId: string | null;
    messages: Message[];
    currentQuestion: string | null;
    finished: boolean;
    totalQuestions: number;
    currentIndex: number;
    setSessionId: (id: string) => void;
    addMessage: (msg: Message) => void;
    setCurrentQuestion: (q: string) => void;
    setFinished: (f: boolean) => void;
    setTotalQuestions: (n: number) => void;
    setCurrentIndex: (i: number) => void;
    reset: () => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
    sessionId: null,
    messages: [],
    currentQuestion: null,
    finished: false,
    totalQuestions: 0,
    currentIndex: 0,

    setSessionId: (id) => set({ sessionId: id }),
    addMessage: (msg) => set((st) => ({ messages: [...st.messages, msg] })),
    setCurrentQuestion: (q) => set({ currentQuestion: q }),
    setFinished: (f) => set({ finished: f }),
    setTotalQuestions: (n) => set({ totalQuestions: n }),
    setCurrentIndex: (i) => set({ currentIndex: i }),

    reset: () =>
        set({
            sessionId: null,
            messages: [],
            currentQuestion: null,
            finished: false,
        }),
}));
