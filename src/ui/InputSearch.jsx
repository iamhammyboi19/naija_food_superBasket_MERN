import styled from "styled-components";

const InputSearch = styled.input`
  font-size: 1.4rem;
  border: none;
  width: 100%;
  background-color: #f8f9fa;
  color: var(--oc-gray-8);
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 1.2rem;
    color: var(--oc-gray-6);
    font-weight: 300;
  }
`;

export default InputSearch;
