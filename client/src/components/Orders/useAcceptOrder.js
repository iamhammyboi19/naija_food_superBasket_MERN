import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accept_order_fe } from "../../apiServices/apiOrders";
import toast from "react-hot-toast";

export default function useAcceptOrder() {
  const queryClient = useQueryClient();
  const { mutate: accept_order_api, isPending: is_accepting_order } =
    useMutation({
      mutationFn: ({ order_id }) => accept_order_fe(order_id),
      onSuccess: () => {
        toast.success("Order successfully accepted");
        queryClient.invalidateQueries(["order"]);
      },
    });

  return { is_accepting_order, accept_order_api };
}
