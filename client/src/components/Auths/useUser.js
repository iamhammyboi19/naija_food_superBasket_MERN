import { useQuery } from "@tanstack/react-query";
import { get_current_user_from_cookie } from "../../apiServices/apiAuths";

export default function useUser() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: get_current_user_from_cookie,
  });

  return {
    isLoading,
    isError,
    user: data?.user,
    isAuthenticated: data?.isAuthenticated,
    role: data?.user?.role,
  };
}
