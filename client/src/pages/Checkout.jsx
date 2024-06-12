import styled from "styled-components";
import DeliveryAddress from "../components/Checkout/DeliveryAddress";
import PersonalDetails from "../components/Checkout/PersonalDetails";
import CartCheckout from "../components/Carts/CartCheckout";
import Title from "../ui/Title";
import { LongFormButton } from "../ui/LongFormButton";
import ActionButton from "../ui/ActionButton";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUser from "../components/Auths/useUser";
import usePlaceOrder from "../components/Orders/usePlaceOrder";
import toast from "react-hot-toast";
// import { useEffect } from "react";

const GridCon = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1.2fr;
  column-gap: 4rem;
  margin-top: 2rem;

  @media (max-width: 75em) {
    grid-template-columns: 1fr;
  }
`;

function Checkout() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { is_placing_order, place_order_api } = usePlaceOrder();

  // useEffect

  return (
    <div>
      <ActionButton
        flex="yes"
        br="var(--border-radius-sm)"
        bg="var(--oc-gray-9)"
        bd="var(--oc-gray-9)"
        pd="5px 15px"
        ml="auto"
        // disabled={is_creating_menu}
        onClick={() => navigate(-1)}
      >
        <IoArrowBack fontSize="2rem" strokeWidth={2} />
        <span>Back</span>
      </ActionButton>
      <Title as="h2">Complete checkout</Title>
      <GridCon>
        <div style={{ marginBottom: "20px" }}>
          <DeliveryAddress />
          <PersonalDetails />
          <LongFormButton
            onClick={() => {
              if (
                user?.location?.length === 0 ||
                user?.location?.length === undefined
              ) {
                toast.error("Please add your delivery address", {
                  duration: 7000,
                });
              } else {
                place_order_api();
              }
            }}
            disabled={is_placing_order}
          >
            Place order
          </LongFormButton>
        </div>
        <div>
          <CartCheckout carts={user.carts} />
        </div>
      </GridCon>
    </div>
  );
}

export default Checkout;
