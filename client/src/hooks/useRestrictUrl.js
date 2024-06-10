import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../components/Auths/useUser";

// restrict restaurant or user role
export default function useRestrictUrl(user_role) {
  const { role } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (role === user_role) navigate("/");
    },
    [navigate, role, user_role]
  );

  return null;
}
