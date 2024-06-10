/* eslint-disable react/prop-types */
import styled from "styled-components";
import Add2CartOptsHeader from "./Add2CartOptsHeader";
// import { toppings } from "../utils/dataSample";
// import { useState } from "react";

const StyledAddToCartProductOpts = styled.div`
  padding: 2rem;
`;

function AddToCartProductOpts({ toppings }) {
  // const [collectToppings, setCollectToppings] = useState({});
  // console.log(collectToppings);

  return (
    <StyledAddToCartProductOpts>
      {toppings.map((el) => (
        <Add2CartOptsHeader
          menuOptName={el.slug}
          numOfSelections={el.num_of_selections || 1}
          isCompulsory={el.compulsory}
          key={el.id}
          id={el.id}
          options={el.options}
          // onSetCollectToppings={setCollectToppings}
          // collectToppings={collectToppings}
        />
      ))}
    </StyledAddToCartProductOpts>
  );
}

export default AddToCartProductOpts;
