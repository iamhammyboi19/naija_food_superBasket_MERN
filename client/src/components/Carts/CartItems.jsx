/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "../../ui/Title";
import { HiOutlineXMark } from "react-icons/hi2";
import DescriptionText from "../../ui/DescriptionText";
import IncDecProductItem from "../IncDecProductItem";
import ImageBackGroundCover from "../../ui/ImageBackGroundCover";
import useDeletecart from "../Menus/useDeleteCart";
// import useIncCarts from "../Menus/useIncCarts";
// import useDecCarts from "../Menus/useDecCarts";

// HiMiniPlus, HiMiniMinus,
// const Img = styled.img`
//   max-width: 40%;
//   border-right: 1px solid var(--oc-gray-4);
//   padding-right: 2rem;

//   @media (max-width: 23.5em) {
//     padding-right: 1.5rem;
//   }
// `;

// const IncreaseOrDecreaseCart = styled.div`
//   display: flex;
//   align-items: center;
//   justify-items: center;
//   border: 1px solid var(--oc-gray-6);
//   border-radius: var(--border-radius-lg);
//   padding: 0 0.4rem 0 0.4rem;
//   gap: 0.3rem;

//   & span {
//     border-right: 1px solid var(--oc-gray-6);
//     border-left: 1px solid var(--oc-gray-6);
//     padding-left: 0.7rem;
//     padding-right: 0.7rem;
//     font-weight: 500;
//     font-size: 1.2rem;
//   }
// `;

const QtyIncDec = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  border-top: 1px solid var(--oc-gray-4);
  padding-top: 2rem;

  & div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  @media (max-width: 23.5em) {
    gap: 0.8rem;
    margin-top: 1rem;
    flex-direction: column;
  }

  & span {
    font-weight: 500;
    color: var(--oc-gray-8);
    font-size: 1.3rem;
  }
`;

const StyledCartItems = styled.div`
  display: flex;
  align-items: center;
  justify-items: flex-start;
  gap: 2rem;
  position: relative;
  margin-bottom: 2rem;
  /* z-index: -9; */

  border-radius: var(--border-radius-lg);
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  @media (max-width: 23.5em) {
    padding: 2rem;
    /* gap: 1rem; */
  }
`;

// const styleicon = {
//   fontSize: "1.5rem",
//   color: "var(--oc-blue-8)",
//   strokeWidth: "1",
//   cursor: "pointer",
// };

const AfterImg = styled.div`
  @media (max-width: 23.5em) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function CartItems({ cart }) {
  const { remove_cart_api, is_removing_cart } = useDeletecart();

  return (
    <StyledCartItems>
      <ImageBackGroundCover
        path={cart.menu_image}
        bs="cover"
        width="15rem"
        height="100px"
      />
      <AfterImg>
        <Title as="h4">{cart.menu_name}</Title>
        <DescriptionText desc="tiny">{cart.menu_desc}</DescriptionText>
        <QtyIncDec>
          <IncDecProductItem
            already_in_carts="yes"
            // inc={inc_menu_in_cart_api}
            // dec={dec_menu_in_cart_api}
            // incing={is_increasing_carts}
            // decing={is_decreasing_carts}
            menu_id={cart.id}
            quan={cart.quantity}
          />
          <DescriptionText desc="true">{cart.price}</DescriptionText>
          <DescriptionText desc="bold">{cart.total_price}</DescriptionText>
        </QtyIncDec>
      </AfterImg>
      <button disabled={is_removing_cart}>
        <HiOutlineXMark
          style={{
            position: "absolute",
            strokeWidth: "5",
            top: "4%",
            right: "2%",
            cursor: "pointer",
          }}
          onClick={() => remove_cart_api({ menu_id: cart.id })}
        />
      </button>
    </StyledCartItems>
  );
}

export default CartItems;
