import client from "./client";

export async function uploadResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await client.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return resp.data; // { resume_id }
}

export async function getResume(resumeId: string) {
    const resp = await client.get(`/resume/${resumeId}`);
    return resp.data;
}

export async function parseResume(resumeId: string) {
    const resp = await client.post(`/resume/${resumeId}/parse`);
    return resp.data; // { fields: {...} }
}


export async function updateResumeFields(resumeId: string, fields: any) {
    const resp = await client.post(`/resume/${resumeId}/update-fields`, fields);
    return resp.data;
}

export async function getRecommendations(resumeId: string, payload: any) {
    const resp = await client.post(`/resume/${resumeId}/recommendations`, payload);
    return resp.data;
}

export async function applyRecommendations(resumeId: string) {
    const resp = await client.post(`/resume/${resumeId}/apply`);
    return resp.data;
}

export async function generateResume(resumeId: string, template: string) {
    const resp = await client.post(`/resume/${resumeId}/generate`, { template });
    return resp.data; // { pdf_url, html }
}
