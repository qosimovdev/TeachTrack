import api from "./axios";

export const createAccount = async (data) => {
    const res = await api.post("/student/register", data);
    return res.data;
};

export const loginStudent = async (data) => {
    const res = await api.post("/student/login", data);
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/student/me");
    return res.data;
};
