/* eslint-disable react/prop-types */
import { HiMiniStar, HiShoppingBag, HiTruck } from "react-icons/hi2";
import FlexRow from "../../ui/FlexRow";
import ImageBackGroundCover from "../../ui/ImageBackGroundCover";
import Title from "../../ui/Title";
import DescriptionText from "../../ui/DescriptionText";

function RestaurantHeader({ restaurant, menu_overview }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <ImageBackGroundCover
        bs="cover"
        bp="center"
        path={menu_overview.cover_photo}
        height="20rem"
        mb="2rem"
      />
      <Title as="h2">{restaurant.restaurant_name}</Title>
      <FlexRow fc="yes">
        <FlexRow gap="0.5rem">
          <HiTruck color="var(--oc-gray-7)" />
          <DescriptionText desc="semi-tiny">
            {" "}
            {menu_overview.delivery_fee < 1
              ? "Free Shipping"
              : `#${menu_overview.delivery_fee}`}
          </DescriptionText>
        </FlexRow>
        <FlexRow gap="0.5rem">
          <HiShoppingBag color="var(--oc-gray-7)" />
          <DescriptionText desc="semi-tiny">
            Minimum Delivery Amount #{menu_overview.minimum_purchase}
          </DescriptionText>
        </FlexRow>
      </FlexRow>
      <FlexRow gap="0.5rem" mt="1rem">
        <span>
          <strong>{restaurant.ratingsAvg}</strong>
        </span>
        <HiMiniStar />
        <DescriptionText desc="true">{`(${restaurant.ratingsQuantity})`}</DescriptionText>
      </FlexRow>
    </div>
  );
}

export default RestaurantHeader;
