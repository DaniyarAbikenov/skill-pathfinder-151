import client from "./client";

export async function startInterview(payload: {
    company_description: string;
    job_description: string;
    tech_stack: string;
    style: string;
}) {
    const r = await client.post("/interview/start", payload);
    return r.data;
}

export async function answerInterview(sessionId: string, answer: string) {
    const r = await client.post(`/interview/${sessionId}/answer`, { answer });
    return r.data;
}
