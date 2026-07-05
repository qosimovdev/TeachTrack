/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { createStudent } from "@/api/studentAuth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreate = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createStudent,
        onSuccess: (data) => {
            toast.success("Student yaratildi");
            navigate("/teacher/students");
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Xatolik"
            );
        },
    });
};