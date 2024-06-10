/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledFlexRow = styled.div`
  display: flex;
  align-items: ${(props) => (props.$fs === "yes" ? "flex-start" : "center")};
  justify-items: center;
  gap: ${(props) => props.$gap || "2rem"};
  margin-top: ${(props) => (props.$mt ? props.$mt : "")};

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

function FlexRow({ children, gap, fs, mt, fc }) {
  return (
    <StyledFlexRow $fc={fc} $mt={mt} $fs={fs} $gap={gap}>
      {children}
    </StyledFlexRow>
  );
}

export default FlexRow;
