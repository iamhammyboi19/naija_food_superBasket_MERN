/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const Figure = styled.figure`
  height: ${(props) => props.$height || "15rem"};
  background-image: url(${(props) => props.$path});
  background-size: ${(props) => props.$bs || "50%"};
  background-position: ${(props) => props.$bp || "top"};
  background-repeat: no-repeat;
  box-shadow: ${(props) =>
    props.$boxS === "no" ? "none" : "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"};
  border-radius: ${(props) =>
    props.$br === "no" ? "0px" : "var(--border-radius-lg)"};
  margin-bottom: ${(props) => props.$mb || "0rem"};

  ${(props) =>
    props.$width &&
    css`
      width: ${(props) => props.$width || "150px"};
    `}
`;

function ImageBackGroundCover({ height, path, bs, bp, br, mb, width, boxS }) {
  return (
    <Figure
      $height={height}
      $path={path}
      $bs={bs}
      $bp={bp}
      $br={br}
      $mb={mb}
      $width={width}
      $boxS={boxS}
    ></Figure>
  );
}

export default ImageBackGroundCover;
