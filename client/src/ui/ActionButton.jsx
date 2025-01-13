/* eslint-disable react/prop-types */
import styled, { css, keyframes } from "styled-components";

const scaleBtn = keyframes`
  0%{
    scale: 1;
  }

  50%{
    scale: 1.08;
  }

  100%{
    scale: 1;
  }
`;

const CallToAction = styled.button`
  font-size: ${(props) => props.$fs || "14px"};
  padding: ${(props) => props.$pd || "10px 20px"};
  font-weight: ${(props) => props.$fontW || 600};
  color: ${(props) => props.$fg || "var(--oc-white)"};
  border: 1px solid ${(props) => props.$bd || "var(--oc-gray-9)"};
  border-radius: ${(props) => props.$br || ""};
  padding-right: ${(props) => props.$pr || ""};
  background-color: ${(props) => props.$bg || "var(--oc-gray-9)"};
  letter-spacing: 0.2px;
  /* width: ${(props) => props.$width || "100%"}; */
  transition: all ease 0.5s;
  margin-top: ${(props) => props.$mt || "0px"};
  margin-left: ${(props) => props.$ml || "0px"};
  margin-right: ${(props) => props.$mr || "0px"};
  border-top-right-radius: ${(props) => props.$btr || ""};
  border-bottom-right-radius: ${(props) => props.$bbr || ""};
  border-bottom-left-radius: ${(props) => props.$bbl || ""};
  border-top-left-radius: ${(props) => props.$btl || ""};

  ${(props) =>
    props.$flex === "yes" &&
    css`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-items: center;
      text-align: center;
    `}

  ${(props) =>
    props.$hover === "yes" &&
    css`
      &:hover {
        color: ${(props) => props.$nfg || "var(--oc-white)"};
        background-color: ${(props) => props.$nbg || "var(--oc-gray-9)"};
        animation-play-state: paused;
        transform: scale(0.9);
      }
    `}

    ${(props) =>
    props.$hover === "yez" &&
    css`
      &:hover {
        color: ${(props) => props.$nfg || "var(--oc-white)"};
        background-color: ${(props) => props.$nbg || "var(--oc-gray-9)"};
        border: 1px solid ${(props) => props.$nbd || "var(--oc-gray-9)"};
      }
    `}

    ${(props) =>
    props.$animate === "yes" &&
    css`
      animation: ${scaleBtn} 2s ease-in-out infinite;
    `}

    ${(props) =>
    props.$width &&
    css`
      width: ${(props) => props.$width};

      @media (max-width: 53.75em) {
        width: 50%;
      }
    `} 

    ${(props) =>
    props.$width2 &&
    css`
      width: ${(props) => props.$width2};
    `} 

    ${(props) =>
    props.$pos === "yes" &&
    css`
      position: relative;
    `}

  ${(props) =>
    props.$fw === "yes" &&
    css`
      width: 100%;
    `} /* @media (max-width: 48.125em) {
    font-size: 12px;
    padding: 5px 10px;
  } */
`;

function ActionButton({
  children,
  fg,
  bg,
  bd,
  br,
  pr,
  fw,
  flex,
  pd,
  onClick,
  fontW,
  fs,
  nfg,
  nbg,
  nbd,
  hover,
  mt,
  ml,
  mr,
  width,
  width2,
  btl,
  bbr,
  bbl,
  btr,
  pos,
  type,
  disabled,
  animate,
}) {
  return (
    <CallToAction
      $fs={fs}
      $fg={fg}
      $bg={bg}
      $bd={bd}
      $br={br}
      $pr={pr}
      $fw={fw}
      $width={width}
      $width2={width2}
      $flex={flex}
      $pd={pd}
      $nfg={nfg}
      $nbg={nbg}
      $nbd={nbd}
      $hover={hover}
      $fontW={fontW}
      $mt={mt}
      $ml={ml}
      $mr={mr}
      $btl={btl}
      $btr={btr}
      $bbl={bbl}
      $bbr={bbr}
      $pos={pos}
      $animate={animate}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </CallToAction>
  );
}

export default ActionButton;
