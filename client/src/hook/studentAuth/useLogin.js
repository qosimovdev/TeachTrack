import { useMutation } from "@tanstack/react-query";
import { loginStudent } from "../../api/studentAuth.api";
import useAuthStore from "../../store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    return useMutation({
        mutationFn: loginStudent,
        onSuccess: ({ token, student }) => {
            login({ token, student });
            toast.success("Salom!");
            navigate("/student/dashboard", {
                replace: true,
            });
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Login failed"
            );
        },
    });
};