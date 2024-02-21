/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const CallToAction = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  font-weight: 600;
  color: ${(props) => props.$fg || "var(--oc-white)"};
  border: 1px solid ${(props) => props.$bd || "var(--oc-gray-9)"};
  border-radius: ${(props) => props.$br || ""};
  padding-right: ${(props) => props.$pr || ""};
  background-color: ${(props) => props.$bg || "var(--oc-gray-9)"};
  display: flex;
  align-items: center;
  gap: 1rem;

  ${(props) =>
    props.$fw === "yes" &&
    css`
      width: 100%;
    `}

  @media (max-width: 48.125em) {
    font-size: 12px;
    padding: 5px 10px;
  }
`;

function ActionButton({ children, fg, bg, bd, br, pr, fw }) {
  return (
    <CallToAction $fg={fg} $bg={bg} $bd={bd} $br={br} $pr={pr} $fw={fw}>
      {children}
    </CallToAction>
  );
}

export default ActionButton;
