/* eslint-disable react/prop-types */
import styled from "styled-components";
import AddToCartTitle from "./AddToCartTitle";
import AddToCartBsk from "./AddToCartBsk";
import AddToCartProductOpts from "./AddToCartProductOpts";
import AddToCartNote from "./AddToCartNote";
import ImageBackGroundCover from "../ui/ImageBackGroundCover";
import useUser from "../components/Auths/useUser";
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

function AddToCartOverlay({ menu }) {
  // check if current menu is in user cart so to avoid duplicate addition
  // tho this is already handled in the API
  const { user } = useUser();
  const menu_in_cart = user?.carts
    ?.filter((cart) => cart.id === menu._id)
    ?.at(0);

  return (
    <StyledAddToCartOverlay>
      <ImageBackGroundCover
        bs="100%"
        br="no"
        path={menu.menu_image}
        bp="center"
        height="25rem"
      ></ImageBackGroundCover>
      <AddToCartTitle menu={menu} />
      <AddToCartProductOpts toppings={menu.toppings} />
      <AddToCartNote />
      <AddToCartBsk
        menu_id={menu._id}
        menu_in_cart={menu_in_cart !== undefined}
        cart={menu_in_cart}
      />
    </StyledAddToCartOverlay>
  );
}

export default AddToCartOverlay;
