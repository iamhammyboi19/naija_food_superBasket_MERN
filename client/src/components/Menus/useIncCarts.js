import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inc_menu_in_cart } from "../../apiServices/apiCarts";

export default function useIncCarts() {
  const queryClient = useQueryClient();
  const { mutate: inc_menu_in_cart_api, isPending: is_increasing_carts } =
    useMutation({
      mutationFn: ({ menu_id }) => inc_menu_in_cart(menu_id),
      onSuccess: () => {
        // toast.success("Carts cleared successfully");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { inc_menu_in_cart_api, is_increasing_carts };
}
