import styled from "styled-components";

const InputText = styled.input`
  width: 100%;
  padding: 12px;
  background-color: var(--oc-gray-1);
  border: none;
  font-size: 1.4rem;
  border-radius: var(--border-radius-md);
  transition: all ease 0.2s;
  box-shadow: 0 0 0 1px var(--oc-gray-5);

  &::placeholder {
    font-size: 1.4rem;
    color: var(--oc-gray-6);
    line-height: 24px;
    font-weight: 100;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--oc-gray-9);
    background-color: var(--oc-white);
  }
`;

export default InputText;
