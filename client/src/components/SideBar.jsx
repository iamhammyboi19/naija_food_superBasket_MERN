/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import IconAndSideBarName from "../ui/IconAndSideBarName";
import { HiHome, HiShoppingCart, HiUserCircle } from "react-icons/hi2";
// import { SlSettings } from "react-icons/sl";
// import { AiFillSetting } from "react-icons/ai";
// import { IoLogOut } from "react-icons/io5";

import { IoFastFoodSharp } from "react-icons/io5";
import { MdPedalBike } from "react-icons/md";
import { useAppLayout } from "../pages/AppLayout";
import useUser from "./Auths/useUser";

const StyledSideBar = styled.div`
  height: 100vh;
  width: 300px;
  border: 0.5px solid var(--oc-gray-4);
  padding: 2rem 1rem;
  overflow: scroll;
  position: fixed;
  z-index: 1;
  top: ${(props) =>
    props.$mt === null || props.$mt === "null" ? 0 : `${props.$mt}px`};
  left: 0;
  background-color: var(--oc-white);
  transform: translateX(0%);
  transition: ${(props) =>
    props.$sh === "false" && "transform 0.5s, opacity 0.5s"};

  @media (max-width: 53.4375em) {
    transform: ${(props) =>
      props.$ssa === "true" || props.$sh === "true"
        ? "translateX(0%)"
        : "translateX(-100%)"};
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    opacity: ${(props) => (props.$ssa === "true" ? 1 : 0)};
    width: 100%;
  }
`;

function SideBar() {
  const { startSlideShowAnimation, startHiding, navHeight } = useAppLayout();
  const { role } = useUser();
  return (
    <StyledSideBar
      $mt={navHeight}
      $ssa={startSlideShowAnimation.toString()}
      $sh={startHiding.toString()}
    >
      <IconAndSideBarName
        sideBarName="Dashboard"
        to="/dashboard"
        Icon={<HiHome fontSize={"20px"} color="var(--oc-gray-7)" />}
      />

      {role === "restaurant" && (
        <IconAndSideBarName
          sideBarName="Menus"
          to="/menus"
          Icon={<IoFastFoodSharp fontSize={"20px"} color="var(--oc-gray-7)" />}
        />
      )}

      {role === "user" && (
        <>
          <IconAndSideBarName
            sideBarName="Restaurants"
            to="/restaurants"
            Icon={
              <IoFastFoodSharp fontSize={"20px"} color="var(--oc-gray-7)" />
            }
          />
          <IconAndSideBarName
            sideBarName="Carts"
            to="/carts"
            Icon={<HiShoppingCart fontSize={"20px"} color="var(--oc-gray-7)" />}
          />
        </>
      )}

      <IconAndSideBarName
        sideBarName="Orders"
        to="/orders"
        Icon={<MdPedalBike fontSize={"20px"} color="var(--oc-gray-7)" />}
      />

      <IconAndSideBarName
        sideBarName="Map"
        to="/map"
        Icon={<HiShoppingCart fontSize={"20px"} color="var(--oc-gray-7)" />}
      />
      <IconAndSideBarName
        sideBarName="Account"
        to="/account"
        Icon={<HiUserCircle fontSize={"20px"} color="var(--oc-gray-7)" />}
      />
      {/* <IconAndSideBarName
        sideBarName="Logout"
        to="/logout"
        Icon={<IoLogOut fontSize={"20px"} color="var(--oc-gray-7)" />}
      /> */}
    </StyledSideBar>
  );
}

export default SideBar;
