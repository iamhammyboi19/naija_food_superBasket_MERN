import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => loginUser(data),
    onSuccess: ({ message }) => {
      // forces it to query the cookies
      toast.success(message);

      queryClient.invalidateQueries(["user"]);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { isPending, mutate };
}
