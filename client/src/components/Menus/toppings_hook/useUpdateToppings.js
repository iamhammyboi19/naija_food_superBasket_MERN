import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { update_toppings } from "../../../apiServices/apiMenus";

export default function useUpdateToppings() {
  const queryClient = useQueryClient();
  const { mutate: update_toppings_api, isPending: is_updating_toppings } =
    useMutation({
      mutationFn: ({ menu_id, data, toppings_slug }) =>
        update_toppings(data, menu_id, toppings_slug),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["menu"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { update_toppings_api, is_updating_toppings };
}
