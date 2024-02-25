import ImageBackGroundCover from "../ui/ImageBackGroundCover";
import Title from "../ui/Title";
import FlexRow from "../ui/FlexRow";
import { HiMiniStar, HiShoppingBag, HiTruck } from "react-icons/hi2";
import DescriptionText from "../ui/DescriptionText";
import FoodMenus from "../components/FoodMenus";
import GridTemplate from "../ui/GridTemplate";

function Order() {
  return (
    <div>
      <ImageBackGroundCover
        bs="cover"
        bp="center"
        path="/burger.jpg"
        height="20rem"
        mb="2rem"
      />
      <Title as="h2">McDonald&apos;s</Title>
      <FlexRow fc="yes">
        <FlexRow gap="0.5rem">
          <HiTruck color="var(--oc-gray-7)" />
          <DescriptionText desc="semi-tiny">Free Shipping</DescriptionText>
        </FlexRow>
        <FlexRow gap="0.5rem">
          <HiShoppingBag color="var(--oc-gray-7)" />
          <DescriptionText desc="semi-tiny">
            Minimum Delivery Amount 140 TL
          </DescriptionText>
        </FlexRow>
      </FlexRow>
      <FlexRow gap="0.5rem" mt="1rem">
        <span>
          <strong>3.1</strong>
        </span>
        <HiMiniStar />
        <DescriptionText desc="true">(1000)</DescriptionText>
      </FlexRow>

      <GridTemplate cols={2}>
        <FoodMenus />
        <FoodMenus />
        <FoodMenus />
        <FoodMenus />
      </GridTemplate>
    </div>
  );
}

export default Order;
