import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_menu } from "../../apiServices/apiMenus";
import toast from "react-hot-toast";

export default function useDeleteMenu() {
  const queryClient = useQueryClient();
  const { mutate: delete_menu_api, isPending: is_deleting_menu } = useMutation({
    mutationFn: ({ menu_id }) => delete_menu(menu_id),
    onSuccess: () => {
      toast.success("Menu successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });
  return { delete_menu_api, is_deleting_menu };
}
