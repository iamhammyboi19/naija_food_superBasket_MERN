import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import ActionButton from "../../ui/ActionButton";

const Img = styled.img`
  max-width: 50%;
  text-align: center;
`;

const EmptyCartsCon = styled.div`
  border: 1px solid var(--oc-gray-4);
  padding: 4rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 31.8125em) {
    padding: 2rem;
  }
`;

function EmptyCarts() {
  return (
    <div>
      <EmptyCartsCon>
        <Img src="/addToCart.png" alt="add to cart" />
        <DescriptionText al="center">
          Your cart is empty. Keep shopping to add a product!
        </DescriptionText>
        <ActionButton>Keep shopping</ActionButton>
      </EmptyCartsCon>
    </div>
  );
}

export default EmptyCarts;
