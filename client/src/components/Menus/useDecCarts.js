import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dec_menu_in_cart } from "../../apiServices/apiCarts";

export default function useDecCarts() {
  const queryClient = useQueryClient();
  const { mutate: dec_menu_in_cart_api, isPending: is_decreasing_carts } =
    useMutation({
      mutationFn: ({ menu_id }) => dec_menu_in_cart(menu_id),
      onSuccess: () => {
        // toast.success("Carts cleared successfully");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { dec_menu_in_cart_api, is_decreasing_carts };
}
