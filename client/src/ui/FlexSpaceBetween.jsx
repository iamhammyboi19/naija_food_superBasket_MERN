/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: ${(props) => (props.$fe ? "flex-end" : "center")};
  margin-top: ${(props) => props.$mt || "0px"};
  align-self: flex-start;
`;

function FlexSpaceBetween({ children, fe, mt }) {
  return (
    <StyledFlex $fe={fe} $mt={mt}>
      {children}
    </StyledFlex>
  );
}

export default FlexSpaceBetween;
