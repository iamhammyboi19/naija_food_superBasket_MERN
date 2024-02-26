import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import HeaderNav from "../components/Headers/HeaderNav";
import { createContext, useContext, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const AppLayoutContext = createContext();

const StyledAppLayout = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 4fr; */
  margin-top: ${(props) =>
    props.$mt === null || props.$mt === "null" ? 0 : `${props.$mt}px`};
`;

const StyledOutlet = styled.div`
  padding: 2rem 3rem;
  max-width: 100%;
  margin-left: 320px;
  z-index: -99;
  overflow: scroll;

  @media (max-width: 53.4375em) {
    margin-left: 0;
  }
`;

function AppLayout() {
  const [navHeight, setNavHeight] = useState(null);
  const [startSlideShowAnimation, setSlideShowAnimation] = useState(false);
  const { width } = useWindowSize();
  const startHiding = width > 855;
  return (
    <AppLayoutContext.Provider
      value={{
        navHeight,
        startSlideShowAnimation,
        onSetAnimation: setSlideShowAnimation,
        onSetNavHeight: setNavHeight,
        startHiding,
      }}
    >
      <HeaderNav />
      <StyledAppLayout $mt={navHeight}>
        <SideBar />
        <StyledOutlet>
          <Outlet />
        </StyledOutlet>
      </StyledAppLayout>
    </AppLayoutContext.Provider>
  );
}

function useAppLayout() {
  const context = useContext(AppLayoutContext);
  if (context === undefined)
    throw new Error("Context was used outside of the Context Provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppLayout, useAppLayout };
