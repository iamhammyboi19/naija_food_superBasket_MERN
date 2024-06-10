/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledFlexRow = styled.div`
  display: flex;
  align-items: ${(props) => (props.$fs === "yes" ? "flex-start" : "center")};
  justify-items: center;
  gap: ${(props) => props.$gap || "2rem"};
  margin-top: ${(props) => (props.$mt ? props.$mt : "")};
  flex-direction: ${(props) => props.$cd || "row"};

  ${(props) =>
    props.$cursor &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    props.$as &&
    css`
      align-self: flex-start;
    `}

  ${(props) =>
    props.$width &&
    css`
      width: 100%;
    `}

  @media (max-width: 48.125em) {
    margin-top: ${(props) => props.$mt && "1rem"};
    gap: ${(props) => props.$gap || "1rem"};
  }

  ${(props) =>
    props.$fc &&
    css`
      @media (max-width: 34.25em) {
        flex-direction: column;
        align-items: flex-start;
      }
    `}
`;

function FlexRow({
  children,
  gap,
  fs,
  mt,
  fc,
  width,
  as,
  onClick,
  cursor,
  cd,
}) {
  return (
    <StyledFlexRow
      $cd={cd}
      $fc={fc}
      $mt={mt}
      $fs={fs}
      $gap={gap}
      $width={width}
      $as={as}
      $cursor={cursor}
      onClick={onClick}
    >
      {children}
    </StyledFlexRow>
  );
}

export default FlexRow;
