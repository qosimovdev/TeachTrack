import { createGroup } from "../../api/group.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            toast.success("Group created successfully");
            queryClient.invalidateQueries({
                queryKey: ["groups"],
            });
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ??
                "Failed to create group"
            );
        },
    });
};