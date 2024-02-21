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
import ActionButton from "./ActionButton";

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
        if (ref.current.contains(e.target)) {
          return;
        }
        close();
      }

      document.addEventListener("click", handleOutsideClick);

      return () => document.removeEventListener("click", handleOutsideClick);
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
            right: "0%",
            top: "3%",
          }}
        >
          <ActionButton
            onClick={() => close()}
            bg="var(--oc-gray-0)"
            bc="var(--oc-gray-0)"
          >
            <HiOutlineXMark color="#616161" fontSize={20} />
          </ActionButton>
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
