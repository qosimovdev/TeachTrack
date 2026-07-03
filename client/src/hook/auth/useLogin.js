import { useMutation } from "@tanstack/react-query";
import { loginTeacher } from "../../api/auth.api";
import useAuthStore from "../../store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    return useMutation({
        mutationFn: loginTeacher,
        onSuccess: ({ token, teacher }) => {
            login({ token, teacher });
            toast.success("Salom!");
            navigate("/teacher/dashboard", {
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