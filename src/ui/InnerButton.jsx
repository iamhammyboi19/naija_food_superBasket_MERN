/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledInnerButton = styled.button`
  font-size: 1.1rem;
  font-weight: 400;
  background-color: ${(props) => props.bg || "var(--oc-green-9)"};
  color: ${(props) => props.tc || "var(--oc-white)"};
  border-radius: var(--border-radius-md);
  padding: 0.4rem 0.4rem;
  border: 1px solid ${(props) => props.bc || "var(--oc-green-4)"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.oh || ""};
  }
`;

function InnerButton({ children, bg, bc, onClick, tc, type, disabled, oh }) {
  return (
    <StyledInnerButton
      disabled={disabled}
      onClick={onClick}
      $bg={bg}
      $bc={bc}
      $tc={tc}
      $oh={oh}
      type={type}
    >
      {children}
    </StyledInnerButton>
  );
}

export default InnerButton;
