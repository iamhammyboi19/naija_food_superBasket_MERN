import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_user_account } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: update_user, isPending: is_updating_user } = useMutation({
    mutationFn: ({ data }) => update_user_account(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { update_user, is_updating_user };
}
