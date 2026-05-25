import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";

const useLogin = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login successful");
            queryClient.invalidateQueries(["authUser"]);
        },
    });
    return {error, loginMutation: mutate, isPending};
}

export default useLogin