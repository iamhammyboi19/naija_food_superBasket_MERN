import styled, { css, keyframes } from "styled-components";
import MaxWidthCenter from "../../ui/MaxWidthCenter";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import useWindowSize from "../../hooks/useWindowSize";
import { useShowHideMenus } from "../../hooks/useShowHideMenus";

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

const StyledFooter = styled.div`
  padding: 0rem 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 46.875em) {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
`;

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${(props) =>
    props.$animateShow === "true" &&
    css`
      animation: ${showul} 0.3s ease-in-out;
    `}

  & li a {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
    font-weight: 500;
    color: var(--oc-gray-8);
  }
  & li a:active,
  a:link {
    color: var(--oc-gray-8);
  }

  & li a:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h5`
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

function Footer() {
  const { width } = useWindowSize();
  const startHiding = width < 751;
  const stillShow = width > 750;
  const { showHideToggle, curSpot, showHideToggleFunc } = useShowHideMenus();
  return (
    <div style={{ borderTop: "1px solid var(--oc-gray-2)" }}>
      <MaxWidthCenter mw="120rem" mt="7rem">
        <StyledFooter>
          <div>
            <FlexSpaceBetween onClick={() => showHideToggleFunc(1)} mb="1.5rem">
              <Title>Company & legal</Title>
              {startHiding && (
                <>
                  {startHiding && showHideToggle && curSpot === 1 ? (
                    <motion.div
                      key="arrow-up"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowUp style={{ fontSize: "3rem" }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="arrow-down"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowDown style={{ fontSize: "3rem" }} />
                    </motion.div>
                  )}{" "}
                </>
              )}
            </FlexSpaceBetween>
            <div style={{ overflow: "hidden" }}>
              {(stillShow || (startHiding && curSpot === 1)) && (
                <UL $animateShow={(startHiding && curSpot === 1).toString()}>
                  <li>
                    <a href="#">Our story</a>{" "}
                  </li>
                  <li>
                    <a href="#">Terms of use</a>{" "}
                  </li>
                  <li>
                    <a href="#">Cookie policy</a>{" "}
                  </li>
                  <li>
                    <a href="#">Privacy policy</a>{" "}
                  </li>
                  <li>
                    <a href="#">Terms and conditions</a>{" "}
                  </li>
                </UL>
              )}
            </div>
          </div>
          <div>
            <FlexSpaceBetween onClick={() => showHideToggleFunc(2)} mb="1.5rem">
              <Title>Support</Title>
              {startHiding && (
                <>
                  {startHiding && showHideToggle && curSpot === 2 ? (
                    <motion.div
                      key="arrow-up"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowUp style={{ fontSize: "3rem" }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="arrow-down"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowDown style={{ fontSize: "3rem" }} />
                    </motion.div>
                  )}{" "}
                </>
              )}
            </FlexSpaceBetween>
            {(stillShow || (startHiding && curSpot === 2)) && (
              <UL $animateShow={(startHiding && curSpot === 2).toString()}>
                <li>
                  <a href="#">Our story</a>{" "}
                </li>
                <li>
                  <a href="#">Terms of use</a>{" "}
                </li>
                <li>
                  <a href="#">Cookie policy</a>{" "}
                </li>
                <li>
                  <a href="#">Privacy policy</a>{" "}
                </li>
                <li>
                  <a href="#">Terms and conditions</a>{" "}
                </li>
              </UL>
            )}
          </div>
          <div>
            <FlexSpaceBetween onClick={() => showHideToggleFunc(3)} mb="1.5rem">
              <Title>Quicklinks</Title>
              {startHiding && (
                <>
                  {startHiding && showHideToggle && curSpot === 3 ? (
                    <motion.div
                      key="arrow-up"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowUp style={{ fontSize: "3rem" }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="arrow-down"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowDown style={{ fontSize: "3rem" }} />
                    </motion.div>
                  )}{" "}
                </>
              )}
            </FlexSpaceBetween>
            {(stillShow || (startHiding && curSpot === 3)) && (
              <UL $animateShow={(startHiding && curSpot === 3).toString()}>
                <li>
                  <a href="#">Our story</a>{" "}
                </li>
                <li>
                  <a href="#">Terms of use</a>{" "}
                </li>
                <li>
                  <a href="#">Cookie policy</a>{" "}
                </li>
                <li>
                  <a href="#">Privacy policy</a>{" "}
                </li>
                <li>
                  <a href="#">Terms and conditions</a>{" "}
                </li>
              </UL>
            )}
          </div>
        </StyledFooter>
      </MaxWidthCenter>
    </div>
  );
}

export default Footer;
