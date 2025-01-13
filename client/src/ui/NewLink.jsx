/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";

const MyLink = styled(Link)`
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: var(--oc-gray-7);
  margin-right: 3rem;
  padding-bottom: 0.2rem;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;

  &:active {
    color: var(--oc-gray-7);
  }

  &:hover {
    color: var(--oc-gray-9);

    .showmenu {
      opacity: 1;
      visibility: visible;
      pointer-events: visible;
    }
  }

  &:hover::after {
    background-color: var(--oc-gray-9);
    width: 100%;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0%;
    background-color: var(--oc-white);
    height: 0.1rem;
    bottom: 0%;
    left: 0;
    opacity: 0;
    transition: width 0.4s ease-in-out, background-color 0.4s ease-in-out,
      opacity 0.4s ease-in-out;
  }

  @media (max-width: 76.25em) {
    font-size: 1.2rem;
    margin-right: 2rem;
  }
`;

function NewLink({ title, showmenu }) {
  return (
    <MyLink>
      {title} {showmenu}
    </MyLink>
  );
}

export default NewLink;
