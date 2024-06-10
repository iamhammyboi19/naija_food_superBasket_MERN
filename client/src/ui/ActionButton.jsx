/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const CallToAction = styled.button`
  font-size: ${(props) => props.$fs || "14px"};
  padding: ${(props) => props.$pd || "10px 20px"};
  font-weight: ${(props) => props.$fontW || 600};
  color: ${(props) => props.$fg || "var(--oc-white)"};
  border: 1px solid ${(props) => props.$bd || "var(--oc-gray-9)"};
  border-radius: ${(props) => props.$br || ""};
  padding-right: ${(props) => props.$pr || ""};
  background-color: ${(props) => props.$bg || "var(--oc-gray-9)"};
  transition: all ease 0.3s;
  margin-top: ${(props) => props.$mt || "0px"};
  margin-left: ${(props) => props.$ml || "0px"};
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
        color: ${(props) => props.$nfg};
        background-color: ${(props) => props.$nbg};
      }
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
  fs,
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
  nfg,
  nbg,
  hover,
  mt,
  ml,
  width,
  btl,
  bbr,
  bbl,
  btr,
  type,
  disabled,
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
      $flex={flex}
      $pd={pd}
      $nfg={nfg}
      $nbg={nbg}
      $hover={hover}
      $fontW={fontW}
      $mt={mt}
      $ml={ml}
      $btl={btl}
      $btr={btr}
      $bbl={bbl}
      $bbr={bbr}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </CallToAction>
  );
}

export default ActionButton;
