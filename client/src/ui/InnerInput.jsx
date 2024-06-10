import styled from "styled-components";

const InnerInput = styled.input`
  padding: 10px 13px;
  font-size: 14px;
  border: 1px solid var(--oc-gray-4);
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border: 1px solid var(--oc-gray-6);
  }

  &::placeholder {
    font-size: 14px;
    color: var(--oc-gray-5);
    font-weight: 400;
  }
`;

export default InnerInput;
