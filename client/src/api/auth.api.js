import api from "./axios";

export const createAccount = async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const loginTeacher = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};
