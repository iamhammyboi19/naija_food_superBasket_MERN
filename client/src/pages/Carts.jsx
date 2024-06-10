/* eslint-disable react/prop-types */

import styled from "styled-components";
import MainCarts from "../components/Carts/MainCarts";
import useRestrictUrl from "../hooks/useRestrictUrl";
import useDocumentTitle from "../hooks/useDocumentTitle";

const StyledDashboard = styled.div`
  padding: 2rem;
`;

function Carts() {
  useRestrictUrl("restaurant");
  useDocumentTitle("Cart | Naija Food superBasket");

  return (
    <StyledDashboard>
      <MainCarts />
    </StyledDashboard>
  );
}

export default Carts;
