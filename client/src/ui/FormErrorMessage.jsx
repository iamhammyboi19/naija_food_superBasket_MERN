/* eslint-disable react/prop-types */
import styled from "styled-components";

const P = styled.span`
  font-size: 1.3rem;
  color: var(--oc-red-9);
`;

function FormErrorMessage({ children }) {
  return <P>{children}</P>;
}

export default FormErrorMessage;
