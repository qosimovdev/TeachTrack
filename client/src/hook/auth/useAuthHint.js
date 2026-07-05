import { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import { useMe } from "./useUser";

export const useAuthInit = (role) => {
    const { data, isLoading, isError } = useMe(role);
    const login = useAuthStore((s) => s.login);
    const setInitializing = useAuthStore((s) => s.setInitializing);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setInitializing(false);
            return;
        }
        if (data && token) {
            login({
                user: data,
                token,
            });
            setInitializing(false);
        }
        if (!isLoading && isError) {
            localStorage.removeItem("token");
            setInitializing(false);
        }
    }, [data, isLoading, isError, setInitializing]);
};