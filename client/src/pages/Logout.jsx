import styled from "styled-components";
import Spinner from "../ui/Spinner";
import useLogout from "../components/Auths/useLogout";
import { useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  /* background-color: var(--backdrop-color); */
  /* backdrop-filter: blur(4px); */
  background-color: var(--oc-white);
  z-index: 1000;
  transition: all 0.5s;
`;

function Logout() {
  const { mutate } = useLogout();
  useEffect(
    function () {
      mutate();
    },
    [mutate]
  );

  return (
    <Overlay>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Spinner />
      </div>
    </Overlay>
  );
}

export default Logout;
