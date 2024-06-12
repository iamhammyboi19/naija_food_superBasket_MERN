import { useMutation } from "@tanstack/react-query";
import { place_order } from "../../apiServices/apiOrders";
import { useNavigate } from "react-router-dom";

export default function usePlaceOrder() {
  const navigate = useNavigate();
  const { mutate: place_order_api, isPending: is_placing_order } = useMutation({
    mutationFn: place_order,
    onSuccess: ({ data: { data } }) => {
      window.open(data.authorization_url, "_blank");
      setTimeout(() => navigate("/orders"), 5000);
    },
  });

  return { is_placing_order, place_order_api };
}
