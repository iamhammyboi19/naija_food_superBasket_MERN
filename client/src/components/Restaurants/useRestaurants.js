import { useQuery } from "@tanstack/react-query";
import { get_all_restaurants } from "../../apiServices/apiAuths";

export default function (query_str = "") {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants", query_str],
    queryFn: () => get_all_restaurants(query_str.toLowerCase()),
  });
  return { data, isLoading, isError };
}
