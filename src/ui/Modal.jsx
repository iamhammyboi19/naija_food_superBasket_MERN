/* eslint-disable react/prop-types */

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";
import IconsBackgroundTaker from "./IconsBackgroundTaker";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--oc-gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem 1.5rem 1rem 1.5rem;
  transition: all 0.5s;
  @media (max-width: 45.1875em) {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const IconBG = styled(IconsBackgroundTaker)`
  height: 3rem;
  width: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [opens, setOpens] = useState("");
  const close = () => setOpens("");
  return (
    <ModalContext.Provider value={{ opens, setOpens, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { setOpens } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      setOpens(opens);
    },
  });
}

function Window({ children, name }) {
  const { opens, close } = useContext(ModalContext);

  const ref = useRef(null);

  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current?.contains(e.target)) {
          return;
        }
        close();
      }

      document.addEventListener("click", handleOutsideClick, true);

      return () =>
        document.removeEventListener("click", handleOutsideClick, true);
    },
    [close]
  );

  if (opens !== name) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <span
          style={{
            position: "absolute",
            right: "3%",
            top: "3%",
            zIndex: 999999999,
            border: "none",
          }}
        >
          <IconBG onClick={() => close()}>
            <HiOutlineXMark color="#616161" fontSize={20} />
          </IconBG>
        </span>
        {cloneElement(children, { onClose: close })}
      </StyledModal>
    </Overlay>,

    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
