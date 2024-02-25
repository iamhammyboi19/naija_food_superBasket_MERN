import styled from "styled-components";
import AddToCartTitle from "./AddToCartTitle";
import AddToCartBsk from "./AddToCartBsk";
import AddToCartProductOpts from "./AddToCartProductOpts";
import AddToCartNote from "./AddToCartNote";
import ImageBackGroundCover from "../ui/ImageBackGroundCover";
// import IconsBackgroundTaker from "../ui/IconsBackgroundTaker";

const StyledAddToCartOverlay = styled.div`
  width: 70rem;
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: var(--border-radius-lg);
  height: 80dvh;
  overflow: scroll;
  position: relative;

  & .tops_opt_con {
    margin-bottom: 30px;
  }

  [class~="tops_opt_con"]:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 45.1875em) {
    width: 100%;
  }
`;

function AddToCartOverlay() {
  return (
    <StyledAddToCartOverlay>
      <ImageBackGroundCover
        bs="100%"
        br="no"
        path="/burger.jpg"
        bp="center"
        height="25rem"
      ></ImageBackGroundCover>
      <AddToCartTitle />
      <AddToCartProductOpts />
      <AddToCartNote />
      <AddToCartBsk />
    </StyledAddToCartOverlay>
  );
}

export default AddToCartOverlay;
