import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_user_address } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";

export default function useDeleteLocation() {
  const queryClient = useQueryClient();
  const { mutate: delete_location, isPending: is_deleting_location } =
    useMutation({
      mutationFn: ({ data }) => delete_user_address(data),
      onSuccess: () => {
        toast.success("Address successfully deleted");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });
  return { delete_location, is_deleting_location };
}
