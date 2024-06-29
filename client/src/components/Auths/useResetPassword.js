import { useMutation, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verify_email_reset_password_token } from "../../apiServices/apiAuths";

export default function useResetPassword() {
  const navigate = useNavigate();

  const queryClient = new QueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ token, data: inputdata }) =>
      verify_email_reset_password_token(token, inputdata),

    onSuccess: (data) => {
      toast.success(data?.message);
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], data?.user);
    },

    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { isPending, mutate };
}
