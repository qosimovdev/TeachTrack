import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/auth.api";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createAccount,
        onSuccess: ({ token, user }) => {
            login({ token, user });
            toast.success(`Xush kelibsiz, ${user.fullName}`);
            navigate("/dashboard", {
                replace: true,
            });
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Ro'yxatdan o'tishda xatolik"
            );
        },
    });
};