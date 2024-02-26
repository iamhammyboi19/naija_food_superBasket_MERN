import styled, { css } from "styled-components";

const InputContainer = styled.div`
  border: 1px solid var(--oc-gray-6);
  border-radius: var(--border-radius-xlg);
  width: ${(props) => props.$w || "80%"};
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  transition: all ease 0.3s;

  /* &:hover {
     border: 1px solid var(--oc-gray-9);
  } */
  ${(props) =>
    props.$bg &&
    css`
      background-color: ${props.$bg};
      border: none;
    `}/* @media (max-width: 62.9375em) {
    width: 80%;
  }

  @media (max-width: 55.9375em) {
    width: 80%;
  }

  @media (max-width: 51em) {
    width: 30rem;
  }

  @media (max-width: 38.25em) {
    width: 25rem;
  } */
`;

export default InputContainer;
