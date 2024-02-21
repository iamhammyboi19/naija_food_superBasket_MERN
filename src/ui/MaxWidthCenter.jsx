import styled from "styled-components";

const StyledMaxWidthCenter = styled.div`
  max-width: 400px;
  margin: 20px auto 0 auto;
  padding: 5rem 5rem;
`;

// eslint-disable-next-line react/prop-types
function MaxWidthCenter({ children }) {
  return <StyledMaxWidthCenter>{children}</StyledMaxWidthCenter>;
}

export default MaxWidthCenter;
