import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import HeaderNav from "../components/HeaderNav";
import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const StyledAppLayout = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 4fr; */
  margin-top: ${(props) =>
    props.$mt === null || props.$mt === "null" ? 0 : `${props.$mt}px`};
`;

function AppLayout() {
  const [navHeight, setNavHeight] = useState(null);
  const [startSlideShowAnimation, setSlideShowAnimation] = useState(false);
  const { width } = useWindowSize();
  const startHiding = width > 855;
  return (
    <>
      <HeaderNav
        onSetNavHeight={setNavHeight}
        onSetAnimation={setSlideShowAnimation}
        startSlideShowAnimation={startSlideShowAnimation}
      />
      <StyledAppLayout $mt={navHeight}>
        <SideBar
          mt={navHeight}
          onSetAnimation={setSlideShowAnimation}
          startSlideShowAnimation={startSlideShowAnimation}
          startHiding={startHiding}
        />
        <Outlet />
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
