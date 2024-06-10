import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_user_account } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";

export function useMenuOverview() {
  const queryClient = useQueryClient();
  const { mutate: update_menu_overview, isPending: is_updating_menu_overview } =
    useMutation({
      mutationFn: ({ data }) => update_user_account(data),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["restaurant"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { update_menu_overview, is_updating_menu_overview };
}
