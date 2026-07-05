import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../../api/group.api";

export const useGroups = () => {
    return useQuery({
        queryKey: ["groups"],
        queryFn: getGroups,
        throwOnError: false,
    });
};