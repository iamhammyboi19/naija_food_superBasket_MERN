import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_menu } from "../../apiServices/apiMenus";
import toast from "react-hot-toast";

export default function useCreateMenu() {
  const queryClient = useQueryClient();
  const { mutate: create_menu_api, isPending: is_creating_menu } = useMutation({
    mutationFn: ({ data }) => create_menu(data),
    onSuccess: () => {
      toast.success("Menu successfully created");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });

  return { create_menu_api, is_creating_menu };
}
