/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.$fe ? "flex-end" : "center")};
`;

function FlexSpaceBetween({ children, fe }) {
  return <StyledFlex $fe={fe}>{children}</StyledFlex>;
}

export default FlexSpaceBetween;
