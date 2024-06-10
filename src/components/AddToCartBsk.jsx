import styled from "styled-components";
import ActionButton from "../ui/ActionButton";
import IncDecProductItem from "./IncDecProductItem";

const StyledAddToCartBsk = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px 0px inset;
  background-color: var(--oc-white);
`;

function AddToCartBsk() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <StyledAddToCartBsk>
        <IncDecProductItem />
        <ActionButton fw="yes" br="var(--border-radius-sm)">
          Add to Basket
        </ActionButton>
      </StyledAddToCartBsk>
    </div>
  );
}

export default AddToCartBsk;
