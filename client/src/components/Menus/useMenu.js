import { useQuery } from "@tanstack/react-query";
import { get_specific_menu } from "../../apiServices/apiMenus";
import { useParams } from "react-router-dom";

export default function useMenu() {
  const { menu_id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["menu", menu_id],
    queryFn: () => get_specific_menu(menu_id),
  });

  return { isLoading, menu: data?.data?.menu };
}
