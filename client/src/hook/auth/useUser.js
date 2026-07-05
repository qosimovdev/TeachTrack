import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useMe = (role) => {
    return useQuery({
        queryKey: ["me", role],
        queryFn: async () => {
            if (role === "TEACHER") {
                const res = await api.get("/auth/me");
                return res.data;
            }
            if (role === "STUDENT") {
                const res = await api.get("/students/me");
                return res.data;
            }
            throw new Error("Unknown role");
        },
        enabled: !!role,
        retry: false,
    });
};