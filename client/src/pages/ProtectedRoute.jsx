/* eslint-disable react/prop-types */
import styled from "styled-components";
import useUser from "../components/Auths/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledProtectedRoute = styled.div`
  height: 100vh;
  background-color: var(--oc-white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <StyledProtectedRoute>
        <Spinner />
      </StyledProtectedRoute>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
