/* eslint-disable react/prop-types */
import styled from "styled-components";
import Logo from "./Logo";
// import Search from "./Search";
// import ActionButton from "../../ui/ActionButton";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

// import Modal from "../ui/Modal";
// import SliderShow from "./SliderShow";
import { useEffect, useRef } from "react";
import { useAppLayout } from "../../pages/AppLayout";
import FlexRow from "../../ui/FlexRow";
import DescriptionText from "../../ui/DescriptionText";
import Modal from "../../ui/Modal";
import DisplayMap from "../GoogleMapAddLocation/DisplayMap";
import useUser from "../Auths/useUser";
import { useDispatch } from "react-redux";
import { addLatLng } from "../../allRedux/latlngSlice";

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
  z-index: 9;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */

  @media (max-width: 53.4375em) {
    justify-content: space-between;
    padding: 1.5rem 2rem;
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

// const SecondPart = styled.div`
//   display: flex;
//   align-items: center;
//   justify-items: center;
//   gap: 1rem;
//   margin-left: auto;

//   @media (max-width: 53.4375em) {
//     margin-left: 0;
//   }
// `;

function HeaderNav() {
  const {
    onSetNavHeight,
    onSetAnimation,
    startSlideShowAnimation,
    startHiding,
  } = useAppLayout();

  const ref = useRef(null);
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(
    function () {
      // check if user already have location uploaded
      if (user?.location?.length > 0) {
        const [lng, lat] = user.location.at(0).coordinate;
        dispatch(addLatLng({ lng, lat }));
      }
      onSetNavHeight(ref.current.clientHeight);
    },
    [onSetNavHeight, ref?.current?.clientHeight, user?.location, dispatch]
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

        {startHiding && <></>}
      </FirstPart>

      <Modal>
        <Modal.Open opens="usermap">
          <FlexRow gap="0.3rem" cursor="pointer">
            <FaMapMarkerAlt color="var(--oc-green-8)" />
            <FlexRow gap="0.3rem">
              <DescriptionText desc="true">
                {user?.location?.length < 1
                  ? "Enter address"
                  : user?.location?.at(0)?.address?.suburb?.substring(0, 14)}
              </DescriptionText>
              <IoIosArrowDown />
            </FlexRow>
          </FlexRow>
        </Modal.Open>
        <Modal.Window mw="yes" name="usermap">
          <DisplayMap />
        </Modal.Window>
      </Modal>

      {/* {startHiding && (
        <SecondPart>
          <ActionButton fg="var(--oc-gray-9)" bg="var(--oc-white)">
            Log in
          </ActionButton>
          <ActionButton>Sign up</ActionButton>
        </SecondPart>
      )} */}

      {/* {!startHiding && (
        <HiMiniMagnifyingGlass
          style={{ fontSize: "2.5rem", cursor: "pointer" }}
        />
      )} */}
    </MainHeader>
  );
}

export default HeaderNav;
