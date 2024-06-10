import { useNavigate } from "react-router-dom";
import RestaurantHeader from "../components/Restaurants/RestaurantHeader";
import useRestaurant from "../components/Restaurants/useRestaurant";
import Empty from "../ui/Empty";
import SpinnerContainer from "../ui/SpinnerContainer";
import Spinner from "../ui/Spinner";
import GridTemplate from "../ui/GridTemplate";
import FoodMenus from "../components/Restaurants/FoodMenus";
import ActionButton from "../ui/ActionButton";
import { IoArrowBack } from "react-icons/io5";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Restaurant() {
  const { restaurant, active, isLoadingRestaurant, data, menus } =
    useRestaurant();

  const navigate = useNavigate();

  useDocumentTitle(
    `${restaurant?.restaurant_name || "Restaurant"} | Naija Food superBasket`
  );

  if (isLoadingRestaurant) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (!isLoadingRestaurant && active === false) {
    return <Empty message={data.message} actMsg="go home" src="" />;
  }

  if (active === true) {
    return (
      <div>
        <ActionButton
          flex="yes"
          br="var(--border-radius-sm)"
          bg="var(--oc-gray-9)"
          bd="var(--oc-gray-9)"
          pd="5px 15px"
          ml="auto"
          // disabled={is_creating_menu}
          onClick={() => navigate(-1)}
        >
          <IoArrowBack fontSize="2rem" strokeWidth={2} />
          <span>Back</span>
        </ActionButton>

        <div style={{ opacity: restaurant.open ? "1" : "0.5" }}>
          <RestaurantHeader
            restaurant={restaurant}
            menu_overview={restaurant.menu_overview}
          />

          {menus.length < 1 && (
            <Empty message="No menu posted yet by this restaurant" actMsg="" />
          )}

          {menus.length > 0 && (
            <GridTemplate disabled={!restaurant.open} cols={2}>
              {menus.map((menu) => (
                <FoodMenus key={menu._id} menu={menu} />
              ))}
            </GridTemplate>
          )}
        </div>
      </div>
    );
  }
}

export default Restaurant;
