/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";
import { decQuantity, incQuantity } from "../allRedux/addToCartSlice";
import SpinnerMini from "../ui/SpinnerMini";
import useIncCarts from "./Menus/useIncCarts";
import useDecCarts from "./Menus/useDecCarts";
// import useIncCarts from "./Menus/useIncCarts";
// import useDecCarts from "./Menus/useDecCarts";

const IncreaseOrDecreaseCart = styled.button`
  display: flex;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--oc-gray-6);
  border-radius: var(--border-radius-lg);
  padding: 3px 8px 3px 8px;
  gap: 3px;
  background-color: var(--oc-white);

  & span {
    border-right: 1px solid var(--oc-gray-4);
    border-left: 1px solid var(--oc-gray-4);
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 500;
    font-size: 12px;
  }
`;

const styleicon = {
  fontSize: "1.5rem",
  color: "var(--oc-blue-8)",
  strokeWidth: "1.5",
  cursor: "pointer",
};

const NewSpinnerMini = styled(SpinnerMini)`
  height: 1.2rem;
  width: 1.2rem;
  color: var(--oc-gray-7);
`;

function IncDecProductItem({ already_in_carts = "no", menu_id, quan }) {
  const { quantity } = useSelector((state) => state.addtocart);
  const { inc_menu_in_cart_api, is_increasing_carts } = useIncCarts();
  const { dec_menu_in_cart_api, is_decreasing_carts } = useDecCarts();
  const dispatch = useDispatch();
  const isLoading = is_increasing_carts || is_decreasing_carts;

  return (
    <div>
      <IncreaseOrDecreaseCart disabled={isLoading}>
        <HiMiniMinus
          {...styleicon}
          onClick={() => {
            if (already_in_carts === "no") {
              dispatch(decQuantity());
            } else {
              //
              dec_menu_in_cart_api({ menu_id });
            }
          }}
        />
        <span>
          {isLoading && <NewSpinnerMini />}
          <strong>{!isLoading && <>{quan || quantity}</>}</strong>
        </span>

        <HiMiniPlus
          {...styleicon}
          onClick={() => {
            if (already_in_carts === "no") {
              dispatch(incQuantity());
            } else {
              inc_menu_in_cart_api({ menu_id });
            }
          }}
        />
      </IncreaseOrDecreaseCart>
    </div>
  );
}

export default IncDecProductItem;
