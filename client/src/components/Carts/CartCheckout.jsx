/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import ActionButton from "../../ui/ActionButton";

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.$pdb === "yes" &&
    css`
      border-bottom: 1px solid var(--oc-gray-4);
      padding-bottom: 1rem;
    `}

  ${(props) =>
    props.$pdt === "yes" &&
    css`
      padding-top: 1rem;
    `}

    ${(props) =>
    props.$mb === "yes" &&
    css`
      margin-bottom: 1rem;
    `}
`;

const StyledCartCheckout = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  /* grid-row: 1/2; */
`;

function CartCheckout({ carts, showbtn = false }) {
  const total_price =
    carts?.length > 0 &&
    carts.map((cart) => cart.total_price).reduce((x, y) => x + y, 0);

  return (
    <StyledCartCheckout>
      <FlexDiv $pdt="yes">
        <DescriptionText desc="semi-tiny">Subtotal</DescriptionText>
        <DescriptionText desc="tiny">#{total_price || "0.00"}</DescriptionText>
      </FlexDiv>
      <FlexDiv $pdb="yes">
        <DescriptionText desc="semi-tiny">Delivery</DescriptionText>
        <DescriptionText desc="tiny">#0.00</DescriptionText>
      </FlexDiv>
      <FlexDiv $pdt="yes" $pdb={showbtn && "yes"} $mb="yes">
        <DescriptionText desc="bold">Total</DescriptionText>
        <DescriptionText desc="bold">#{total_price || "0.00"}</DescriptionText>
      </FlexDiv>

      {showbtn && <ActionButton>Checkout</ActionButton>}
    </StyledCartCheckout>
  );
}

export default CartCheckout;
