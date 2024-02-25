/* eslint-disable react/prop-types */
import styled from "styled-components";
import DescriptionText from "../ui/DescriptionText";

const StyledAddToCartTitle = styled.div`
  margin-bottom: 1.4rem;
`;

const StyledPadding = styled.div`
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px 0px inset;
`;

function AddToCartTitle({ menuName, menuDesc, menuPrice }) {
  return (
    <StyledPadding>
      <StyledAddToCartTitle>
        <DescriptionText desc="bold-xl">
          {menuName || "The menu name"}
        </DescriptionText>
        <DescriptionText desc="tiny">
          {menuDesc || "Nuggets (28 pieces) + 2 tender boneless + 1 L. drink"}
        </DescriptionText>
      </StyledAddToCartTitle>
      <DescriptionText desc="bold">{menuPrice || "355 TL"}</DescriptionText>
    </StyledPadding>
  );
}

export default AddToCartTitle;
