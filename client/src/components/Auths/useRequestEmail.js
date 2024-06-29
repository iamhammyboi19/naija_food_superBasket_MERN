import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { forgot_password } from "../../apiServices/apiAuths";

export default function useRequestEmail() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data: email_address }) => forgot_password({ email_address }),

    onSuccess: (data) => {
      toast.success(data.message, { duration: 4000 });
    },

    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { isPending, mutate };
}
