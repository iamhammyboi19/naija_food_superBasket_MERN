/* eslint-disable react/prop-types */
import styled, { css, keyframes } from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { useShowHideMenus } from "../hooks/useShowHideMenus";
import NewLinkButton from "../ui/NewLinkButton";
import useUser from "./Auths/useUser";

const SlideShowSideBar = keyframes`
  from{
    transform: translateY(-100%);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
`;

const hide = keyframes`
  to{
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const Span = styled.span`
  font-weight: 500;
  letter-spacing: 0.5px;
  font-size: 1.8rem;
`;

const SpanArrowAndInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
`;

const SpanArrow = styled.div`
  display: flex;
  gap: 0.8rem;
  align-content: center;
  justify-content: center;
`;

const InnerList = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  font-weight: 400;
  border-radius: 8px;
  letter-spacing: 0.5px;
  transition: all ease-in 0.3s;

  &:hover {
    background-color: var(--oc-indigo-1);
    padding-left: 1.6rem;
  }
`;

const showul = keyframes`
    from{
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        transform: translateY(-40%);
    }

    to{
        opacity: 1;
        pointer-events: visible;
        visibility: visible;
        transform: translateY(0);
    }
`;

const UL = styled.ul`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
  width: 100%;
  animation: ${showul} 0.35s ease-out;
`;

const StyledSideBar2 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 3rem;
  padding: 40px 50px 20px 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  background-color: var(--oc-white);
  margin-top: 7rem;
  animation: ${SlideShowSideBar} 0.5s ease-in-out;

  ${(props) =>
    props.$fade === "true" &&
    css`
      animation: ${hide} 0.5s ease-in-out;
    `}
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function SideBar2({ fadeOut }) {
  const { showHideToggle, curSpot, showHideToggleFunc } = useShowHideMenus();
  const { user } = useUser();

  return (
    <StyledSideBar2 $fade={fadeOut.toString()}>
      {!user && (
        <Flex>
          <NewLinkButton title="Login" to="/login" />
          <NewLinkButton title="Sign up" to="/signup" />
        </Flex>
      )}

      {user && (
        <Flex>
          <NewLinkButton title="Go to dashboard" to="/dashboard" />
        </Flex>
      )}
      <SpanArrowAndInner>
        <SpanArrow onClick={() => showHideToggleFunc(1)}>
          <Span>How it works</Span>{" "}
          {showHideToggle && curSpot === 1 ? (
            <motion.div
              key="arrow-up"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowUp style={{ fontSize: "2rem" }} />
            </motion.div>
          ) : (
            <motion.div
              key="arrow-down"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowDown style={{ fontSize: "2rem" }} />
            </motion.div>
          )}
        </SpanArrow>
        {showHideToggle && curSpot === 1 && (
          <div style={{ overflow: "hidden", width: "100%" }}>
            <UL>
              <InnerList>Build your restaurant page</InnerList>
              <InnerList>Promote your restaurant</InnerList>
              <InnerList>Manage your orders</InnerList>
              <InnerList>Accept payments with ease</InnerList>
            </UL>
          </div>
        )}
      </SpanArrowAndInner>
      <SpanArrowAndInner>
        <SpanArrow onClick={() => showHideToggleFunc(2)}>
          <Span>Features</Span>{" "}
          {showHideToggle && curSpot === 2 ? (
            <motion.div
              key="arrow-up"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowUp style={{ fontSize: "2rem" }} />
            </motion.div>
          ) : (
            <motion.div
              key="arrow-down"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowDown style={{ fontSize: "2rem" }} />
            </motion.div>
          )}
        </SpanArrow>
        {showHideToggle && curSpot === 2 && (
          <UL>
            <InnerList>Build your restaurant page</InnerList>
            <InnerList>Promote your restaurant</InnerList>
            <InnerList>Manage your orders</InnerList>
            <InnerList>Accept payments with ease</InnerList>
          </UL>
        )}
      </SpanArrowAndInner>
      <SpanArrowAndInner>
        <SpanArrow onClick={() => showHideToggleFunc(3)}>
          <Span>Pricing</Span>
        </SpanArrow>
      </SpanArrowAndInner>
      <SpanArrowAndInner>
        <SpanArrow onClick={() => showHideToggleFunc(4)}>
          <Span>About us</Span>{" "}
          {showHideToggle && curSpot === 4 ? (
            <motion.div
              key="arrow-up"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowUp style={{ fontSize: "2rem" }} />
            </motion.div>
          ) : (
            <motion.div
              key="arrow-down"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowDown style={{ fontSize: "2rem" }} />
            </motion.div>
          )}
        </SpanArrow>
        {showHideToggle && curSpot === 4 && (
          <UL>
            <InnerList>Build your restaurant page</InnerList>
            <InnerList>Promote your restaurant</InnerList>
            <InnerList>Manage your orders</InnerList>
            <InnerList>Accept payments with ease</InnerList>
          </UL>
        )}
      </SpanArrowAndInner>
    </StyledSideBar2>
  );
}

export default SideBar2;
