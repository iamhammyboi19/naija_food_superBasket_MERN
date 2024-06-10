/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledLongFormButton = styled.button`
  font-size: 1.5rem;
  font-weight: 500;
  width: ${(props) => props.$width || "100%"};
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  color: var(--oc-white);
  background-color: var(--oc-gray-9);
  border: none;
  transition: all ease 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: var(--oc-gray-8);
  }
`;

function LongFormButton({ children, onClick, disabled, width }) {
  return (
    <StyledLongFormButton $width={width} disabled={disabled} onClick={onClick}>
      {children}
    </StyledLongFormButton>
  );
}

export { LongFormButton, StyledLongFormButton };
