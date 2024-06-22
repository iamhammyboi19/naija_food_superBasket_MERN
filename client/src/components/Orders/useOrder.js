/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { get_specific_order_fe } from "../../apiServices/apiOrders";

export default function useOrder(order_id) {
  const { data, isLoading: isLoadingCurOrder } = useQuery({
    queryKey: ["order", order_id],
    queryFn: () => get_specific_order_fe(order_id),
  });

  return { cur_order: data?.data, isLoadingCurOrder };
}
