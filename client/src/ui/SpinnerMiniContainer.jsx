import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";

const StyledSpinnerMiniContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

function SpinnerMiniContainer() {
  return (
    <StyledSpinnerMiniContainer>
      <SpinnerMini />
    </StyledSpinnerMiniContainer>
  );
}

export default SpinnerMiniContainer;
