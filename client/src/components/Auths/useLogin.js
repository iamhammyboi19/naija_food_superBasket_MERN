import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data }) => loginUser(data),
    onSuccess: ({ message }) => {
      toast.success(message, { duration: 2000 });
      setTimeout(() => navigate("/dashboard"), 3000);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { isPending, mutate };
}
