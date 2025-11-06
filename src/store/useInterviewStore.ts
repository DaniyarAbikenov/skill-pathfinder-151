import { create } from "zustand";

export const useInterviewStore = create((set) => ({
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
