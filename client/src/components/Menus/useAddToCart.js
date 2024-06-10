import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add_to_cart } from "../../apiServices/apiCarts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useAddToCart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: add_to_cart_api,
    isPending: is_adding_to_cart,
    data,
  } = useMutation({
    mutationFn: ({ data, menu_id }) => add_to_cart(data, menu_id),
    onSuccess: (data) => {
      data.issue === false && toast.success(data.message);
      data.issue === true && toast.error(data.message, { duration: 4000 });
      queryClient.invalidateQueries(["user"]);
      // if there is an issue meaning adding menu from different restaurants
      data.issue === false && navigate("/carts");
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });
  //   MAKE SURE YOU RESOLVE ISSUE!!!!!!!!!!!!!!!
  return {
    add_to_cart_api,
    is_adding_to_cart,
    issue: data?.issue,
    message: data?.message,
  };
}
