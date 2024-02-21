import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledError = styled.div`
  margin: 70px auto;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 10rem;
  display: inline-block;
  line-height: 1;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;

  & span {
    font-style: italic;
    color: var(--oc-gray-7);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: var(--oc-gray-5);
  padding: 0.5rem 2rem;
  border-radius: var(--border-radius-md);
  color: var(--oc-gray-9);
  font-weight: 500;
`;

function Error() {
  const location = useLocation();
  console.log(location);
  return (
    <StyledError>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>
        The url <span>{location.pathname} </span> doesn&apos;t exist
      </ErrorMessage>
      <StyledLink to="/">Go home</StyledLink>
    </StyledError>
  );
}

export default Error;
