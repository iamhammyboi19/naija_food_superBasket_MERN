import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => loginUser(data),
    onSuccess: ({ message }) => {
      toast.success(message);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { isPending, mutate };
}
