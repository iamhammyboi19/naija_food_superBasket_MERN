/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { get_all_orders_fe } from "../../apiServices/apiOrders";
import { useSearchParams } from "react-router-dom";

export default function useOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(
    Array.from(searchParams).filter((params) => params.at(1) !== "allorders")
  );

  const { data, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", params],
    queryFn: () => get_all_orders_fe(params),
  });

  return { all_orders: data?.data, isLoadingOrders };
}
