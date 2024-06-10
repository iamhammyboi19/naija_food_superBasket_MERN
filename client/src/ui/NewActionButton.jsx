import styled from "styled-components";

const NewActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: var(--border-radius-sm);
  border: none;
  background-color: transparent;
  transition: all ease 0.3s;
  color: var(--oc-gray-8);
  font-weight: 500;

  & span {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--oc-indigo-8);
    color: var(--oc-white);
  }

  @media (max-width: 31.25em) {
    & span {
      font-size: 1rem;
    }
    padding: 2px 4px;
    gap: 1px;
    border-radius: 2.5px;
  }
`;

export default NewActionButton;
