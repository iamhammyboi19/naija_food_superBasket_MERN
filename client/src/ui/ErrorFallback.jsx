/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "./Title";
import GlobalStyles from "../styles/GlobalStyles";
import ActionButton from "./ActionButton";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--oc-gray-5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--oc-gray-0);
  border: 1px solid var(--oc-gray-1);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--oc-gray-5);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  return (
    <div>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Title as="h1">Something went wrong ⛔️</Title>
          <p>{error.message}</p>
          <ActionButton size="large" onClick={resetErrorBoundary}>
            Try again
          </ActionButton>
        </Box>
      </StyledErrorFallback>
    </div>
  );
}

export default ErrorFallback;
