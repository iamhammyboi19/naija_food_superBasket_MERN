import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reject_order_fe } from "../../apiServices/apiOrders";
import toast from "react-hot-toast";

export default function useRejectOrder() {
  const queryClient = useQueryClient();
  const { mutate: reject_order_api, isPending: is_rejecting_order } =
    useMutation({
      mutationFn: ({ order_id }) => reject_order_fe(order_id),
      onSuccess: () => {
        toast.success("Order successfully rejected");
        queryClient.invalidateQueries(["order"]);
      },
    });

  return { is_rejecting_order, reject_order_api };
}
