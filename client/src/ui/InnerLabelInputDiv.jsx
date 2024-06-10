/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledInnerLabelInputDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: ${(props) => (props.$fd === "row" ? "row" : "column")};
  margin-bottom: ${(props) => (props.$nm === "no" ? "0rem" : "1.5rem")};
  width: 100%;

  & .react-time-picker__wrapper {
    border-radius: var(--border-radius-md);
    padding: 6px;
  }
`;

function InnerLabelInputDiv({ children, nm, fd }) {
  return (
    <StyledInnerLabelInputDiv $fd={fd} $nm={nm}>
      {children}
    </StyledInnerLabelInputDiv>
  );
}

export default InnerLabelInputDiv;
