import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../apiServices/apiAuths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useSignup() {
  const navigate = useNavigate();
  const { isError, isPending, mutate } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      navigate("/confirmaccount", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { isError, isPending, mutate };
}
