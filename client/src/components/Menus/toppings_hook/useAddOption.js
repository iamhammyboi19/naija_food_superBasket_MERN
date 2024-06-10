import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { add_option } from "../../../apiServices/apiMenus";

export default function useAddOption() {
  const queryClient = useQueryClient();
  const { mutate: add_option_api, isPending: is_adding_option } = useMutation({
    mutationFn: ({ menu_id, data, toppings_slug }) =>
      add_option(data, menu_id, toppings_slug),
    onSuccess: () => {
      toast.success("Option added successfully");
      queryClient.invalidateQueries(["menu"]);
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { add_option_api, is_adding_option };
}
