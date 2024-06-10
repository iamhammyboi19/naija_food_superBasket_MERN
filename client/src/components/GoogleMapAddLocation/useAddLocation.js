import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add_user_address } from "../../apiServices/apiAuths";
import toast from "react-hot-toast";

export default function useAddLocation() {
  const queryClient = useQueryClient();
  const { mutate: add_location, isPending: is_adding_location } = useMutation({
    mutationFn: ({ data }) => add_user_address(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message.split(":").pop(), { duration: 4000 });
    },
  });
  return { add_location, is_adding_location };
}
