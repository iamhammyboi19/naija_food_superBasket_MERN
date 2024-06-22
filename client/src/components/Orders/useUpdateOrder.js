import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_order_fe } from "../../apiServices/apiOrders";
import toast from "react-hot-toast";

export default function useUpdateOrder() {
  const queryClient = useQueryClient();
  const { mutate: update_order_api, isPending: is_updating_order } =
    useMutation({
      mutationFn: ({ order_id, data }) => update_order_fe(order_id, data),
      onSuccess: () => {
        toast.success("Order successfully updated");
        queryClient.invalidateQueries(["order"]);
      },
    });

  return { is_updating_order, update_order_api };
}
