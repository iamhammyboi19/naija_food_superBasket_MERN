import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_user_address } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";

export default function useUpdateLocation() {
  const queryClient = useQueryClient();
  const { mutate: update_location, isPending: is_updating_location } =
    useMutation({
      mutationFn: ({ data, location_id }) =>
        update_user_address(data, location_id),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.message.split(":").pop(), { duration: 4000 });
      },
    });
  return { update_location, is_updating_location };
}
