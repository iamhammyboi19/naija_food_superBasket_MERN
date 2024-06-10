import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_password } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { mutate: update_password_api, isPending: is_updating_password } =
    useMutation({
      mutationFn: ({ data }) => update_password(data),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { update_password_api, is_updating_password };
}
