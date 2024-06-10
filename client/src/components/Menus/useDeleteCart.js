import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove_cart } from "../../apiServices/apiCarts";
import toast from "react-hot-toast";

export default function useDeleteAllcarts() {
  const queryClient = useQueryClient();
  const { mutate: remove_cart_api, isPending: is_removing_cart } = useMutation({
    mutationFn: ({ menu_id }) => remove_cart(menu_id),
    onSuccess: () => {
      toast.success("Cart removed successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { remove_cart_api, is_removing_cart };
}
