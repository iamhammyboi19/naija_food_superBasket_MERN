import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { delete_option } from "../../../apiServices/apiMenus";

export default function useDeleteOption() {
  const queryClient = useQueryClient();
  const { mutate: delete_option_api, isPending: is_deleting_option } =
    useMutation({
      mutationFn: ({ menu_id, toppings_slug, option_slug }) =>
        delete_option(menu_id, toppings_slug, option_slug),
      onSuccess: () => {
        toast.success("Option deleted successfully");
        queryClient.invalidateQueries(["menu"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { delete_option_api, is_deleting_option };
}
