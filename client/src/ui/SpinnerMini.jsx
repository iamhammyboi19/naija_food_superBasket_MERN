import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.5rem;
  height: 2.5rem;
  animation: ${rotate} 1.5s infinite linear;
  color: var(--oc-white);
`;

export default SpinnerMini;
