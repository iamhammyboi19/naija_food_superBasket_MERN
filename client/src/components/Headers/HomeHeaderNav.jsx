/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HiBars3, HiXMark } from "react-icons/hi2";
// import SearchOverlay from "../Search/SearchOverlay";
import NewLink from "../../ui/NewLink";
import NewLinkButton from "../../ui/NewLinkButton";
import Logo from "./Logo";
import { motion } from "framer-motion";
import SideBar2 from "../SideBar2";
import useWindowSize from "../../hooks/useWindowSize";
import useUser from "../Auths/useUser";

const MainHeader = styled.nav`
  padding: 0rem 4rem;
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 1fr 1fr;
  width: 100%;
  border: 0.8px solid var(--oc-gray-4);
  position: fixed;
  top: 0;
  background-color: var(--oc-white);
  z-index: 9;

  @media (max-width: 53.4375em) {
    padding: 0rem 2rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const FirstPart = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2rem;
  padding: 2rem 2rem;
`;

const SecondPart = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-self: center;

  @media (max-width: 53.4375em) {
    margin-left: 0;
  }
`;

const ThirdPart = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: flex-end;

  @media (max-width: 76.25em) {
    gap: 1rem;
  }
`;

function HomeHeaderNav({ setNavHeight }) {
  const { width } = useWindowSize();
  const startHiding = width > 855;

  const ref = useRef(null);
  const { user } = useUser();

  const [showSideBar2, setShowSideBar2] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(
    function () {
      setNavHeight(ref.current.clientHeight);
    },
    [setNavHeight, ref?.current?.clientHeight]
  );

  return (
    <MainHeader ref={ref}>
      <FirstPart>
        <Logo />
      </FirstPart>

      {startHiding && (
        <SecondPart>
          <NewLink title="How it works" />
          <NewLink title="Pricing" />
          <NewLink title="About Us" />
          <NewLink title="Features" />
        </SecondPart>
      )}

      {startHiding && !user && (
        <ThirdPart>
          <NewLinkButton title="Login" to="/login" />
          <NewLinkButton title="Sign up" to="/signup" />
        </ThirdPart>
      )}

      {startHiding && user && (
        <ThirdPart>
          <NewLinkButton title="Go to Dashboard" to="/dashboard" />
        </ThirdPart>
      )}

      {!startHiding &&
        (showSideBar2 === true ? (
          <motion.div
            key="markx"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ justifySelf: "flex-end", zIndex: 600 }}
            onClick={() => {
              setFadeOut(true);
              setTimeout(() => {
                setShowSideBar2(false);
              }, 200);
            }}
          >
            <HiXMark
              style={{
                fontSize: "3rem",
                cursor: "pointer",
                strokeWidth: 1,
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="bars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ justifySelf: "flex-end", zIndex: 600 }}
          >
            <HiBars3
              onClick={() => {
                setTimeout(() => {
                  setShowSideBar2(true);
                }, 200);
                setFadeOut(false);
              }}
              style={{
                fontSize: "3rem",
                cursor: "pointer",
                strokeWidth: 1,
              }}
            />
          </motion.div>
        ))}

      {!startHiding && showSideBar2 && <SideBar2 fadeOut={fadeOut} />}
    </MainHeader>
  );
}

export default HomeHeaderNav;
