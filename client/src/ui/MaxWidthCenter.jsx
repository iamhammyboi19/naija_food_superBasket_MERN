import styled from "styled-components";

const StyledMaxWidthCenter = styled.div`
  max-width: ${(props) => props.$mw || "400px"};
  margin: ${(props) => props.$mt || "20px"} auto 0 auto;
  padding: ${(props) => props.$pd || "0px"};
`;

// eslint-disable-next-line react/prop-types
function MaxWidthCenter({ children, mw, mt, pd }) {
  return (
    <StyledMaxWidthCenter $mw={mw} $mt={mt} $pd={pd}>
      {children}
    </StyledMaxWidthCenter>
  );
}

export default MaxWidthCenter;
