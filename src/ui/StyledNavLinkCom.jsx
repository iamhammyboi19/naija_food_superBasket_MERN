/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAppLayout } from "../pages/AppLayout";
// import { useEffect } from "react";

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--oc-gray-7);
  font-weight: 500;
  padding: 0.7rem;
  border-radius: var(--border-radius-lg);
  transition: all ease 0.3s;
  margin-bottom: 1rem;

  &.active {
    background-color: var(--oc-gray-2);
    & .icontaker {
      background-color: var(--oc-gray-9);
    }
    & span {
      color: var(--oc-gray-9);
    }
    & svg {
      fill: var(--oc-white);
    }
  }

  &:hover {
    background-color: var(--oc-gray-2);
    & .icontaker {
      background-color: var(--oc-gray-9);
    }
    & span {
      color: var(--oc-gray-9);
    }
    & svg {
      fill: var(--oc-white);
    }
  }

  @media (max-width: 53.4375em) {
    border-radius: var(--border-radius-md);
  }
`;

function StyledNavLinkCom({ children, to }) {
  const { startHiding, onSetAnimation } = useAppLayout();

  // useEffect(
  //   function () {
  //     function handleTitleChange() {
  //       console.log(to);
  //       // console.log(e.target);
  //       // document.title = to;
  //     }
  //     document.addEventListener("click", handleTitleChange);

  //     return () => document.removeEventListener("click", handleTitleChange);
  //   },
  //   [to]
  // );

  return (
    <StyledNavLink
      onClick={() => {
        if (!startHiding) {
          onSetAnimation(false);
        }
      }}
      to={to}
    >
      {children}
    </StyledNavLink>
  );
}

export default StyledNavLinkCom;
