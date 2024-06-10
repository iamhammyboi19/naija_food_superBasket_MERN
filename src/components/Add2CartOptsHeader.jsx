/* eslint-disable react/prop-types */
import styled from "styled-components";
// import { useState } from "react";
import DescriptionText from "../ui/DescriptionText";
import FlexSpaceBetween from "../ui/FlexSpaceBetween";
import RadioInputTypeII from "../ui/RadioInputTypeII";

const StyledAddToCartTitle = styled.div`
  margin-bottom: 1.2rem;
`;

const Compulsory = styled.p`
  font-size: 1.1rem;
  color: var(--oc-gray-6);
  background-color: var(--oc-gray-2);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-xlg);
  font-weight: 500;
`;

function Add2CartOptsHeader({
  menuOptName,
  isCompulsory = true,
  numOfSelections = 1,
  toppings_collections,
  id,
  onSetCollectToppings,
}) {
  const theMenuName = menuOptName;

  function handleSelect(e) {
    const menu = {};
    menu[this[0]] = e.target.value;
    onSetCollectToppings((toppings) => ({ ...toppings, ...menu }));
  }

  return (
    <div className="tops_opt_con">
      <StyledAddToCartTitle>
        <FlexSpaceBetween>
          <DescriptionText desc="bold">
            {menuOptName || "The toppings name"}
          </DescriptionText>
          {isCompulsory ? (
            <Compulsory>Compulsory</Compulsory>
          ) : (
            <Compulsory>Optional</Compulsory>
          )}
        </FlexSpaceBetween>
        <DescriptionText desc="tiny">
          {numOfSelections} Selection
        </DescriptionText>
      </StyledAddToCartTitle>
      {toppings_collections.map((items) => (
        <RadioInputTypeII
          key={items.name}
          type="radio"
          name={id}
          id={items.name}
          value={items.name}
          label={items.name}
          onChange={handleSelect.bind([theMenuName])}
        />
      ))}
    </div>
  );
}

export default Add2CartOptsHeader;
