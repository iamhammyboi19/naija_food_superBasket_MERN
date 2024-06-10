import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledError = styled.div`
  width: 55rem;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 30px 0;
  background-color: var(--oc-white);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-md);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

const StyledErrorCon = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url("https://i.ibb.co/9s8WTB4/nicholas-bartos-fms2-YKam-M-unsplash.jpg");
  background-size: cover;
  background-position: top;
  position: relative;
`;

function Error() {
  const location = useLocation();
  console.log(location);
  return (
    <StyledErrorCon>
      <StyledError>
        <ErrorCode>404</ErrorCode>
        <ErrorMessage>
          The url <span>{location.pathname} </span> doesn&apos;t exist
        </ErrorMessage>
        <StyledLink to="/">Go home</StyledLink>
      </StyledError>
    </StyledErrorCon>
  );
}

export default Error;
