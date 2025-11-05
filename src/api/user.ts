import client from "./client";

export interface UpdateProfileRequest {
    full_name?: string;
    email?: string;
    desired_position?: string;
    career_goal?: string;
    skills?: string[];
    extra?: Record<string, any>;
}

export async function updateUserProfile(data: UpdateProfileRequest) {
    const resp = await client.post("/user/profile/update", data);
    return resp.data;
}
