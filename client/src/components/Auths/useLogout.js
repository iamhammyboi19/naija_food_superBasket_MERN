import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../apiServices/apiAuths";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      navigate("/");
    },
  });

  return { isPending, mutate };
}
