/* eslint-disable react/prop-types */
import styled from "styled-components";

const Figure = styled.figure`
  height: ${(props) => props.$height || "15rem"};
  background-image: url(${(props) => props.$path});
  background-size: ${(props) => props.$bs || "50%"};
  background-position: ${(props) => props.$bp || "top"};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: ${(props) =>
    props.$br === "no" ? "0px" : "var(--border-radius-lg)"};
  margin-bottom: ${(props) => props.$mb || "0rem"};
`;

function ImageBackGroundCover({ height, path, bs, bp, br, mb }) {
  return (
    <Figure
      $height={height}
      $path={path}
      $bs={bs}
      $bp={bp}
      $br={br}
      $mb={mb}
    ></Figure>
  );
}

export default ImageBackGroundCover;
