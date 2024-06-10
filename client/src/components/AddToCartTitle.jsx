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

function AddToCartTitle({ menu }) {
  return (
    <StyledPadding>
      <StyledAddToCartTitle>
        <DescriptionText desc="bold-xl">{menu.menu_name}</DescriptionText>
        <DescriptionText desc="tiny">{menu.menu_desc}</DescriptionText>
      </StyledAddToCartTitle>
      <DescriptionText desc="bold">#{menu.price}</DescriptionText>
    </StyledPadding>
  );
}

export default AddToCartTitle;
