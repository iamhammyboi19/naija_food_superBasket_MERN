import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { update_option } from "../../../apiServices/apiMenus";

export default function useUpdateOption() {
  const queryClient = useQueryClient();
  const { mutate: update_option_api, isPending: is_updating_option } =
    useMutation({
      mutationFn: ({ menu_id, data, toppings_slug, option_slug }) =>
        update_option(data, menu_id, toppings_slug, option_slug),
      onSuccess: () => {
        toast.success("Option updated successfully");
        queryClient.invalidateQueries(["menu"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { update_option_api, is_updating_option };
}
