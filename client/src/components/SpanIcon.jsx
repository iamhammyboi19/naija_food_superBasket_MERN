import styled, { css } from "styled-components";

const SpanIcon = styled.span`
  font-size: 1.3rem;
  letter-spacing: 0.2px;
  color: var(--oc-blue-8);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: ${(props) => props.$margin || "2rem 0rem"};

  &:hover {
    color: var(--oc-blue-9);
  }

  ${(props) =>
    props.$new &&
    css`
      color: var(--oc-gray-8);
      padding: 5px;
      border-radius: var(--border-radius-md);
      font-size: 1.2rem;
      border: 1px solid var(--oc-gray-8);

      &:hover {
        color: var(--oc-gray-9);
        border: 1px solid var(--oc-gray-9);
      }
    `}
`;

export default SpanIcon;
