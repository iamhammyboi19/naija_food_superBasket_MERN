/* eslint-disable react/prop-types */
import styled, { css, keyframes } from "styled-components";
import { IoMdArrowForward } from "react-icons/io";

import DescriptionText from "../ui/DescriptionText";
import Title from "../ui/Title";
import SpanIcon from "../ui/SpanIcon";
import { useEffect, useRef, useState } from "react";

const slideIn = keyframes`
  from{
    opacity: 0;
    transform: translateY(20%);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledNewSection = styled.div`
  max-width: 70rem;
  width: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 3px solid var(--oc-gray-9);
  opacity: 0;

  ${(props) =>
    props.$index === 1 &&
    props.$showing === "true" &&
    css`
      animation: ${slideIn} 1s linear forwards;
    `}

  ${(props) =>
    props.$index === 2 &&
    props.$showing === "true" &&
    css`
      animation: ${slideIn} 1s linear forwards 0.3s;
    `}

    ${(props) =>
    props.$index === 3 &&
    props.$showing === "true" &&
    css`
      animation: ${slideIn} 1s linear forwards 0.6s;
    `}
`;

const Img = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-top: 3px solid var(--oc-gray-9);
  vertical-align: bottom;
`;

export default function NewSection({ imgpath, heading, index }) {
  const ref = useRef(null);
  const [isIntersecting, setIsInterSecting] = useState(false);

  useEffect(function () {
    const elementRef = ref.current;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInterSecting(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, []);

  return (
    <StyledNewSection
      ref={ref}
      $showing={isIntersecting.toString()}
      $index={index}
    >
      <div style={{ padding: "2rem" }}>
        <Title as="h2">{heading}</Title>
        <DescriptionText desc="true">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam hic
          deleniti dignissimos perferendis omnis.
        </DescriptionText>
        <SpanIcon>
          {" "}
          <span>SEE MORE</span> <IoMdArrowForward fontSize={"1.5rem"} />
        </SpanIcon>
      </div>
      <Img src={imgpath} alt="some illustrators" />
    </StyledNewSection>
  );
}
