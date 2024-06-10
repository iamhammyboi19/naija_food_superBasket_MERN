import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { delete_toppings } from "../../../apiServices/apiMenus";

export default function useDeleteToppings() {
  const queryClient = useQueryClient();
  const { mutate: delete_toppings_api, isPending: is_deleting_toppings } =
    useMutation({
      mutationFn: ({ menu_id, toppings_slug }) =>
        delete_toppings(menu_id, toppings_slug),
      onSuccess: () => {
        toast.success("Toppings deleted successfully");
        queryClient.invalidateQueries(["menu"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { delete_toppings_api, is_deleting_toppings };
}
