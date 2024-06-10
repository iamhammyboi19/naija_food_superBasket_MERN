import styled from "styled-components";

const TableViewDeleteContainer = styled.ul`
  position: absolute;
  right: -1%;
  bottom: -45%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  z-index: 1;

  & li {
    & span {
      font-weight: 300;
      font-size: 1.5rem;
      color: var(--oc-gray-8);
    }

    & button {
      width: 100%;
      padding: 1rem;
      background-color: #fff;
      border: 0.2px solid var(--oc-gray-3);
      display: flex;
      align-items: center;
      gap: 1rem;

      &:hover {
        background-color: var(--oc-gray-1);
        transition: all ease 0.3s;
      }
    }
  }
`;

export default TableViewDeleteContainer;
