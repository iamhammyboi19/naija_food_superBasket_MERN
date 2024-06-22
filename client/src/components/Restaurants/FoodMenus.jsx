/* eslint-disable react/prop-types */
import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import { HiOutlinePlus } from "react-icons/hi2";
import IconsBackgroundTaker from "../../ui/IconsBackgroundTaker";
import Modal from "../../ui/Modal";
import AddToCartOverlay from "../AddToCartOverlay";
import ImageBackGroundCover from "../../ui/ImageBackGroundCover";
// import Title from "../../ui/Title";

// const Img = styled.img`
//   width: 100%;
//   height: 100%;
// `;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const StyledFoodMenu = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: var(--border-radius-lg);
  padding: 1.4rem;
  width: 100%;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: var(--oc-gray-1);
  }
`;

const OrderDesc = styled.div`
  align-self: flex-start;
`;

const IconBG = styled(IconsBackgroundTaker)`
  height: 30px;
  width: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

function FoodMenus({ menu, restaurant_name }) {
  return (
    <StyledFoodMenu>
      <FlexSpaceBetween>
        <OrderDesc>
          <DescriptionText desc="fade-bold">{menu.menu_name}</DescriptionText>
          <DescriptionText desc="true">{menu.menu_desc}</DescriptionText>
        </OrderDesc>
        <ImageContainer>
          {/* <Img src={menu.menu_image} alt="food item" /> */}
          <ImageBackGroundCover
            path={menu.menu_image}
            bs="cover"
            height="100%"
          />
        </ImageContainer>
      </FlexSpaceBetween>
      <FlexSpaceBetween mt="1rem">
        <DescriptionText desc="bold">#{menu.price}</DescriptionText>
        <Modal>
          <Modal.Open opens="addtocart">
            <IconBG>
              <HiOutlinePlus
                fontSize="20px"
                strokeWidth="2"
                color="var(--oc-red-8)"
              />
            </IconBG>
          </Modal.Open>
          <Modal.Window name="addtocart" mw="yes">
            <AddToCartOverlay menu={menu} restaurant_name={restaurant_name} />
          </Modal.Window>
        </Modal>
      </FlexSpaceBetween>
    </StyledFoodMenu>
  );
}

export default FoodMenus;
