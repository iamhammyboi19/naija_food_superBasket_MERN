import { useQuery } from "@tanstack/react-query";
import { get_specific_restaurant } from "../../apiServices/apiAuths";
import { useParams } from "react-router-dom";

export default function useRestaurant() {
  const { restaurant_id } = useParams();
  const {
    data,
    isLoading: isLoadingRestaurant,
    isError,
  } = useQuery({
    queryKey: ["restaurant", restaurant_id],
    queryFn: () => get_specific_restaurant(restaurant_id),
  });

  return {
    restaurant: data?.data?.restaurant,
    isLoadingRestaurant,
    isError,
    active: data?.active_restaurant,
    data,
    menus: data?.data?.restaurant?.menus,
  };
}
