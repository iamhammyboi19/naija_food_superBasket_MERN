/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import IconsBackgroundTaker from "../ui/IconsBackgroundTaker";

const SliderContainer = styled.nav`
  height: 100vh;
  background-color: #ffffff;
  width: 30rem;
  position: relative;
  top: 0;
  left: 0;
  z-index: 99;
  transform: ${(props) =>
    props.$ssa === "true" ? "translateX(0%)" : "translateX(-100%)"};
  opacity: ${(props) => (props.$ssa === "true" ? 1 : 0)};
  padding: 2rem;
  transition: transform 0.5s, opacity 0.5s;
`;

const SliderBack = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: ${(props) =>
    props.$ssa === "true" ? "translateX(0%)" : "translateX(-100%)"};
  position: fixed;
  z-index: 9999999999999999;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.$ssa === "true" ? 1 : 0)};
  transition: transform 0.5s, opacity 0.5s;
`;

const CloseSliderBtn = styled(IconsBackgroundTaker)`
  position: absolute;
  right: -20%;
  top: 3%;
`;

function SliderShow({ onSetAnimation, startSlideShowAnimation }) {
  //   const showslide = startSlideShowAnimation
  //     ? { transform: "translateX(0%)", opacity: 1 }
  //     : {};

  return (
    <SliderBack $ssa={startSlideShowAnimation.toString()}>
      <SliderContainer $ssa={startSlideShowAnimation.toString()}>
        <CloseSliderBtn
          onClick={() => {
            // onCloseModal?.();
            onSetAnimation(false);
          }}
        >
          <HiXMark style={{ fontSize: "3rem", fontWeight: "700" }} />
        </CloseSliderBtn>
        <a href="/login"> First Place</a>
      </SliderContainer>
    </SliderBack>
  );
}

export default SliderShow;
