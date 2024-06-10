import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_menu } from "../../apiServices/apiMenus";
import toast from "react-hot-toast";

export default function useUpdateMenu() {
  const queryClient = useQueryClient();
  const { mutate: update_menu_api, isPending: is_updating_menu } = useMutation({
    mutationFn: ({ menu_id, data }) => update_menu(menu_id, data),
    onSuccess: () => {
      toast.success("Menu successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });
  return { update_menu_api, is_updating_menu };
}
