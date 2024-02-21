import styled from "styled-components";
import Search from "../components/Search";
import CardsWithImage from "../components/CardsWithImage";

const StyledRestaurants = styled.div`
  padding: 2rem;
  max-width: 100%;
  margin-left: 320px;
  z-index: -99;
  overflow: scroll;

  @media (max-width: 53.4375em) {
    margin-left: 0;
  }
`;
function Restaurants() {
  return (
    <StyledRestaurants>
      <Search />
      <CardsWithImage />
    </StyledRestaurants>
  );
}

export default Restaurants;
