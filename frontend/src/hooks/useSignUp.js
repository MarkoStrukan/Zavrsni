import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate: signupMutation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  return { signupMutation, isPending, error };
};

export default useSignUp;
