/* eslint-disable react/prop-types */
import styled from "styled-components";
import Logo from "./Logo";
// import Search from "./Search";
import ActionButton from "../ui/ActionButton";
import { HiBars3, HiMiniMagnifyingGlass, HiXMark } from "react-icons/hi2";
import useWindowSize from "../hooks/useWindowSize";
// import Modal from "../ui/Modal";
// import SliderShow from "./SliderShow";
import { useEffect, useRef } from "react";

const MainHeader = styled.nav`
  padding: 1.6rem 3rem;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2rem;
  width: 100%;
  border: 0.8px solid var(--oc-gray-4);
  position: fixed;
  top: 0;
  background-color: var(--oc-white);
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */

  @media (max-width: 53.4375em) {
    justify-content: space-between;
  }
`;

// const TextLinks = styled.a`
//   font-size: 1.2rem;
//   color: var(--oc-gray-9);
//   transition: all ease 0.3s;

//   &:hover {
//     color: var(--oc-gray-6);
//   }
// `;

const FirstPart = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2rem;
`;

const SecondPart = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 53.4375em) {
    margin-left: 0;
  }
`;

function HeaderNav({
  onSetNavHeight,
  onSetAnimation,
  startSlideShowAnimation,
}) {
  const { width } = useWindowSize();
  const startHiding = width > 855;
  const ref = useRef(null);

  useEffect(
    function () {
      onSetNavHeight(ref.current.clientHeight);
    },
    [onSetNavHeight, ref?.current?.clientHeight]
  );

  return (
    <MainHeader ref={ref}>
      {!startHiding &&
        (startSlideShowAnimation === true ? (
          <HiXMark
            onClick={() => onSetAnimation(false)}
            style={{ fontSize: "2.5rem", cursor: "pointer" }}
          />
        ) : (
          <HiBars3
            onClick={() => onSetAnimation(true)}
            style={{ fontSize: "2.5rem", cursor: "pointer" }}
          />
        ))}
      {/* <SliderShow
        onSetAnimation={setSlideShowAnimation}
        startSlideShowAnimation={startSlideShowAnimation}
      /> */}
      <FirstPart>
        <Logo />
        {startHiding && (
          <>
            {/* <TextLinks href="/">Homepage</TextLinks> */}
            {/* <Search /> */}
          </>
        )}
      </FirstPart>
      {startHiding && (
        <SecondPart>
          <ActionButton fg="var(--oc-gray-9)" bg="var(--oc-white)">
            Log in
          </ActionButton>
          <ActionButton>Sign up</ActionButton>
        </SecondPart>
      )}

      {!startHiding && (
        <HiMiniMagnifyingGlass
          style={{ fontSize: "2.5rem", cursor: "pointer" }}
        />
      )}
    </MainHeader>
  );
}

export default HeaderNav;
