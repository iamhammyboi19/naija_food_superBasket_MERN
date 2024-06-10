/* eslint-disable react/prop-types */
import Spinner from "../../ui/Spinner";
import SpinnerContainer from "../../ui/SpinnerContainer";
import Empty from "../../ui/Empty";
import useRestaurants from "./useRestaurants";
import CardsWithImage from "./CardsWithImage";
import GridTemplate from "../../ui/GridTemplate";

function RestaurantsCard({ restaurant }) {
  const { data, isLoading } = useRestaurants(restaurant);

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (data?.results < 1) {
    return (
      <Empty
        imgurl="/undraw_empty.png"
        message="There is no restaurants available at the moment please check again later"
        actMsg=""
      />
    );
  }

  if (data?.results > 0) {
    return (
      <GridTemplate cols={3}>
        {data.restaurants.map((restaurant) => (
          <CardsWithImage
            key={restaurant._id}
            ratings={restaurant.ratingsAvg}
            ratings_no={restaurant.ratingsQuantity}
            restaurant_name={restaurant.restaurant_name}
            menu_overview={restaurant.menu_overview}
            restaurant_id={restaurant._id}
          />
        ))}
      </GridTemplate>
    );
  }
}

export default RestaurantsCard;
