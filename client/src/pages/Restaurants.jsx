import Search from "../components/Search";
import useRestrictUrl from "../hooks/useRestrictUrl";
import useDocumentTitle from "../hooks/useDocumentTitle";
import RestaurantsCard from "../components/Restaurants/RestaurantsCard";
import { useState } from "react";

function Restaurants() {
  useRestrictUrl("restaurant");
  useDocumentTitle("Restaurants | Naija Food superBasket");
  const [restaurant, setRestaurantSearch] = useState("");
  return (
    <>
      <Search setRestaurant={setRestaurantSearch} restaurant={restaurant} />
      <RestaurantsCard restaurant={restaurant} />
    </>
  );
}

export default Restaurants;
