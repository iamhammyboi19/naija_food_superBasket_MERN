import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--oc-gray-4);
  border-radius: 5px;
  background-color: var(--oc-gray-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;

  /* &:focus {
    outline: none;
    border: 1px solid var(--oc-gray-6);
  } */

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--oc-gray-9);
    background-color: var(--oc-white);
  }
`;

export default Textarea;
