/* eslint-disable react/prop-types */
import styled from "styled-components";
import ActionButton from "../ui/ActionButton";
import IncDecProductItem from "./IncDecProductItem";
import { useDispatch, useSelector } from "react-redux";
import useAddToCart from "./Menus/useAddToCart";
import useDeleteCart from "./Menus/useDeleteCart";
import { resetAll } from "../allRedux/addToCartSlice";
// import Modal from "../ui/Modal";
// import ConfirmDelete from "../ui/ConfirmDelete";
// import useDeleteAllcarts from "./Menus/useDeleteAllCarts";
// import { useEffect } from "react";

const StyledAddToCartBsk = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px 0px inset;
  background-color: var(--oc-white);
`;

function AddToCartBsk({ menu_id, menu_in_cart, cart }) {
  const { quantity, toppings, note } = useSelector((state) => state.addtocart);
  const dispatch = useDispatch();

  const { add_to_cart_api, is_adding_to_cart } = useAddToCart();
  // const { remove_all_cart_api, is_removing_all_carts } = useDeleteAllcarts();
  const { remove_cart_api, is_removing_cart } = useDeleteCart();

  const data = { quantity, toppings, note };

  const isLoading = is_adding_to_cart || is_removing_cart;

  // useEffect(
  //   function () {
  //     if (issue) {
  //       document.querySelector(".trigger").click();
  //     }
  //   },
  //   [issue]
  // );

  return (
    <>
      {/* <Modal>
        <Modal.Open opens="confirmcarts">
          <input type="hidden" className="trigger" />
        </Modal.Open>
        <Modal.Window name="confirmcarts">
          <ConfirmDelete
            disabled={is_removing_all_carts}
            resourceName={`carts`}
            onConfirm={() => {
              console.log("on confirm");
              remove_all_cart_api();
            }}
            additonalMsg={message}
          />
        </Modal.Window>
      </Modal> */}
      <div
        style={{
          width: "100%",
        }}
      >
        <StyledAddToCartBsk>
          <IncDecProductItem
            menu_in_cart={menu_in_cart}
            menu_id={menu_id}
            already_in_carts={menu_in_cart ? "yes" : "no"}
            quan={cart?.quantity}
          />
          {menu_in_cart ? (
            <ActionButton
              onClick={() =>
                remove_cart_api(
                  { menu_id },
                  {
                    onSettled: () => {
                      dispatch(resetAll());
                    },
                  }
                )
              }
              fw="yes"
              br="var(--border-radius-sm)"
              bg="var(--oc-red-9)"
              bd="var(--oc-red-9)"
              disabled={isLoading}
            >
              Remove item from cart
            </ActionButton>
          ) : (
            <ActionButton
              onClick={() =>
                add_to_cart_api(
                  { menu_id, data },
                  {
                    onSettled: () => {
                      dispatch(resetAll());
                    },
                  }
                )
              }
              fw="yes"
              br="var(--border-radius-sm)"
              disabled={isLoading}
            >
              Add to Basket
            </ActionButton>
          )}
        </StyledAddToCartBsk>
      </div>
    </>
  );
}

export default AddToCartBsk;
