import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove_all_cart } from "../../apiServices/apiCarts";
import toast from "react-hot-toast";

export default function useDeleteAllcarts() {
  const queryClient = useQueryClient();
  const { mutate: remove_all_cart_api, isPending: is_removing_all_carts } =
    useMutation({
      mutationFn: remove_all_cart,
      onSuccess: () => {
        toast.success("Carts cleared successfully");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });

  return { remove_all_cart_api, is_removing_all_carts };
}
