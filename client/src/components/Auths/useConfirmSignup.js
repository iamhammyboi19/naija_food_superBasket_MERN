import { useQuery } from "@tanstack/react-query";
import { verify_email_signup_token } from "../../apiServices/apiAuths";
import { useParams } from "react-router-dom";

export default function useConfirmSignup() {
  const { token } = useParams();
  const { isLoading, data, isSuccess, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => verify_email_signup_token(token),
  });

  return {
    isLoading,
    isSuccess,
    error,
    message: data?.message,
  };
}
