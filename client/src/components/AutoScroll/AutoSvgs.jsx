/* eslint-disable react/prop-types */
import styled, { css, keyframes } from "styled-components";
// import Title from "../../ui/Title";

import { TiLocation } from "react-icons/ti";
import { PiStarFourFill } from "react-icons/pi";

import IconsBackgroundTaker from "../../ui/IconsBackgroundTaker";
import { useEffect, useState } from "react";
import DescriptionText from "../../ui/DescriptionText";

const showTitle = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const rotateAngle = keyframes`
  from{
    --angle: 360deg
  }

  to{
    --angle: 0deg;
  }
`;

const StyledAutoSvgs = styled.div`
  height: 110dvh;
  width: 100%;
  background-color: #245040;
  margin-bottom: 6rem;
  position: relative;

  @media (max-width: 60.625em) {
    height: 100dvh;
  }

  @media (max-width: 39.375em) {
    height: 110dvh;
  }
`;

const Figure = styled.figure`
  background-color: ${(props) => props.$bg || "#3d8960"};
  width: 90%;
  height: 65rem;
  max-width: 130rem;
  padding: 4rem 0rem 2rem 0rem;
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--border-radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 48.125em) {
    height: 60rem;
    width: 95%;
  }
`;

const Img = styled.img`
  object-fit: cover;
  margin-bottom: 5rem;
  display: block;
  animation: ${showTitle} 0.45s linear forwards;
`;

const Title = styled.h1`
  font-size: 7rem;
  text-align: center;
  margin-bottom: 3rem;
  animation: ${showTitle} 0.45s linear forwards;

  @media (max-width: 48.125em) {
    font-size: 4rem;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-left: 1.2rem;
  gap: 1.4rem;
`;

const NewBtTaker = styled(IconsBackgroundTaker)`
  height: 60px;
  width: 60px;
  position: relative;

  background-color: ${(props) =>
    props.$curSlide === 1
      ? "#57bf84"
      : props.$curSlide === 2
      ? "#f8d3e1"
      : props.$curSlide === 3
      ? "#000000"
      : props.$curSlide === 4
      ? "#245040"
      : props.$curSlide === 5
      ? "#dc6747"
      : "white"};

  color: ${(props) =>
    props.$curSlide === 1
      ? "#3d8960"
      : props.$curSlide === 2
      ? "#8978e5"
      : props.$curSlide === 3
      ? "#f6c744"
      : props.$curSlide === 4
      ? "#ef8e5a"
      : props.$curSlide === 5
      ? "#fceeba"
      : "white"};

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    padding: 4px;
    animation: ${rotateAngle} 5s linear forwards;
  }

  ${(props) =>
    props.$index === 1 &&
    props.$curSlide === 1 &&
    css`
      &::after {
        background: conic-gradient(from var(--angle), #57bf84, transparent 20%);
      }
      background-color: #3d8960;
      color: #57bf84;
    `}

  ${(props) =>
    props.$index === 2 &&
    props.$curSlide === 2 &&
    css`
      &::after {
        background: conic-gradient(from var(--angle), #f8d3e1, transparent 20%);
      }
      background-color: #8978e5;
      color: #f8d3e1;
    `}

    ${(props) =>
    props.$index === 3 &&
    props.$curSlide === 3 &&
    css`
      &::after {
        background: conic-gradient(from var(--angle), #000000, transparent 20%);
      }
      background-color: #f6c744;
      color: #000000;
    `}

    ${(props) =>
    props.$index === 4 &&
    props.$curSlide === 4 &&
    css`
      &::after {
        background: conic-gradient(from var(--angle), #245040, transparent 20%);
      }
      background-color: #ef8e5a;
      color: #245040;
    `}

    ${(props) =>
    props.$index === 5 &&
    props.$curSlide === 5 &&
    css`
      &::after {
        background: conic-gradient(from var(--angle), #dc6747, transparent 20%);
      }
      background-color: #fceeba;
      color: #dc6747;
    `}

    @media (max-width: 39.375em) {
    height: 50px;
    width: 50px;
  }
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 45rem;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  max-width: 120rem;
`;

const TitleSvg = styled.h2`
  font-size: 5rem;
  line-height: 1.2;
  color: var(--oc-white);

  @media (max-width: 73.125em) {
    font-size: 4rem;
  }

  @media (max-width: 60.625em) {
    font-size: 5rem;
  }
`;

const BottomTextsCon = styled.div`
  position: absolute;
  bottom: 60px;
  display: flex;
  align-items: center;
  padding: 1rem 4rem;
  gap: 4rem;
  left: 50%;
  width: 100%;
  max-width: 135rem;
  transform: translateX(-50%);

  @media (max-width: 60.625em) {
    flex-direction: column;
  }

  @media (max-width: 39.375em) {
    bottom: 30px;
  }
`;

function EachImageSvg({ title, pic, bg, setCurSlide, curSlide }) {
  return (
    <Figure $bg={bg}>
      <Title>{title}</Title>
      <ImgDiv>
        <Img src={pic} />
      </ImgDiv>
      <Flex>
        <NewBtTaker
          $index={1}
          $curSlide={curSlide}
          onClick={() => setCurSlide(1)}
        >
          <TiLocation fontSize="3.5rem" />
        </NewBtTaker>
        <NewBtTaker
          $index={2}
          $curSlide={curSlide}
          onClick={() => setCurSlide(2)}
        >
          <span style={{ fontWeight: 700, fontSize: "15px" }}>01</span>
        </NewBtTaker>
        <NewBtTaker
          $index={3}
          $curSlide={curSlide}
          onClick={() => setCurSlide(3)}
        >
          <span style={{ fontWeight: 700, fontSize: "15px" }}>02</span>
        </NewBtTaker>
        <NewBtTaker
          $index={4}
          $curSlide={curSlide}
          onClick={() => setCurSlide(4)}
        >
          <span style={{ fontWeight: 700, fontSize: "15px" }}>03</span>
        </NewBtTaker>
        <NewBtTaker
          $index={5}
          $curSlide={curSlide}
          onClick={() => setCurSlide(5)}
        >
          <PiStarFourFill fontSize="5rem" />
        </NewBtTaker>
      </Flex>
    </Figure>
  );
}
// TiLocation
export default function AutoSvgs() {
  const [curSlide, setCurSlide] = useState(1);

  const nextSlide = function () {
    setCurSlide((cur) => (cur === 5 ? (cur = 1) : (cur += 1)));
  };

  useEffect(
    function () {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    },
    [curSlide]
  );

  return (
    <StyledAutoSvgs>
      {curSlide === 1 && (
        <EachImageSvg
          title="Get started in 3"
          pic="/burger/african-meals.svg"
          setCurSlide={setCurSlide}
          curSlide={curSlide}
        />
      )}
      {curSlide === 2 && (
        <EachImageSvg
          title="Download the app"
          pic="/burger/Fastfoodxsnacks.svg"
          setCurSlide={setCurSlide}
          bg="#8978e5"
          curSlide={curSlide}
        />
      )}
      {curSlide === 3 && (
        <EachImageSvg
          title="Explore categories"
          pic="/burger/drink.svg"
          setCurSlide={setCurSlide}
          bg="#f6c744"
          curSlide={curSlide}
        />
      )}
      {curSlide === 4 && (
        <EachImageSvg
          title="Place your orders"
          pic="/burger/Fitfam.svg"
          setCurSlide={setCurSlide}
          bg="#ef8e5a"
          curSlide={curSlide}
        />
      )}
      {curSlide === 5 && (
        <EachImageSvg
          title="Enjoy your meal"
          pic="/burger/Pack.svg"
          setCurSlide={setCurSlide}
          bg="#fceeba"
          curSlide={curSlide}
        />
      )}

      <BottomTextsCon>
        <TitleSvg as="h1">Naija Food SuperBasket has you covered!</TitleSvg>
        <DescriptionText color="var(--oc-white)" desc="bold-xl">
          Hungry? Too tired to cook? Have friends over, or do you simply need to
          chop life? Download NaijaFoodSuperBasket, and let’s deliver happiness
          to your doorstep in minutes.
        </DescriptionText>
      </BottomTextsCon>
    </StyledAutoSvgs>
  );
}
