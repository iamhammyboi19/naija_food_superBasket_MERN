/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";

const MyLink = styled(Link)`
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: var(--oc-white);
  position: relative;
  transition: all ease-in-out 0.3s;
  background-color: var(--oc-indigo-8);
  padding: 0.5rem 2rem;
  border-radius: 5px;

  &:active {
    color: var(--oc-white);
  }

  &:hover {
    background-color: var(--oc-indigo-9);
  }

  @media (max-width: 76.25em) {
    font-size: 1.2rem;
  }
`;

function NewLinkButton({ title, to }) {
  return <MyLink to={to}>{title}</MyLink>;
}

export default NewLinkButton;
