import { useQuery } from "@tanstack/react-query";
import { get_specific_restaurant_menus } from "../../apiServices/apiAuths";

export default function useRestaurantMenu(restaurant_id) {
  const {
    data: menu_data,
    isLoading: isLoadingMenus,
    isError,
  } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => get_specific_restaurant_menus(restaurant_id),
  });

  return {
    menus: menu_data?.data?.menus,
    isLoadingMenus,
    isError,
    available: menu_data?.available,
    menu_data,
  };
}
