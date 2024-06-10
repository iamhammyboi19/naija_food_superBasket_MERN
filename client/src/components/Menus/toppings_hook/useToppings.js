import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { add_toppings } from "../../../apiServices/apiMenus";

export default function useToppings() {
  const queryClient = useQueryClient();
  const { mutate: add_toppings_api, isPending: is_adding_toppings } =
    useMutation({
      mutationFn: ({ menu_id, data }) => add_toppings(data, menu_id),
      onSuccess: () => {
        toast.success("Toppings added successfully");
        queryClient.invalidateQueries(["menu"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { add_toppings_api, is_adding_toppings };
}
