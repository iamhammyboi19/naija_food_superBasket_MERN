import styled from "styled-components";
import DeliveryAddress from "../components/Checkout/DeliveryAddress";
import PersonalDetails from "../components/Checkout/PersonalDetails";
import CartCheckout from "../components/Carts/CartCheckout";
import Title from "../ui/Title";
import { LongFormButton } from "../ui/LongFormButton";

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
  return (
    <div>
      <Title as="h2">Complete checkout</Title>
      <GridCon>
        <div style={{ marginBottom: "20px" }}>
          <DeliveryAddress />
          <PersonalDetails />
          <LongFormButton>Place order</LongFormButton>
        </div>
        <div>
          <CartCheckout />
        </div>
      </GridCon>
    </div>
  );
}

export default Checkout;
