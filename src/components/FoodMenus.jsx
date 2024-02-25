import styled from "styled-components";
import DescriptionText from "../ui/DescriptionText";
import FlexSpaceBetween from "../ui/FlexSpaceBetween";
import { HiOutlinePlus } from "react-icons/hi2";
import IconsBackgroundTaker from "../ui/IconsBackgroundTaker";
import Modal from "../ui/Modal";
import AddToCartOverlay from "./AddToCartOverlay";
// import Title from "../../ui/Title";

const Img = styled.img`
  max-width: 10rem;
  /* margin-top: 2rem; */
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
  height: 3rem;
  width: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

function FoodMenus() {
  return (
    <StyledFoodMenu>
      <FlexSpaceBetween>
        <OrderDesc>
          <DescriptionText desc="fade-bold">Maxi Mix Menu</DescriptionText>
          <DescriptionText desc="true">
            Nuggets (28 pieces) + 2 tender boneless + 1 L. drink
          </DescriptionText>
        </OrderDesc>
        <Img src="/Meal-Plan-plate-protein.webp" alt="food item" />
      </FlexSpaceBetween>
      <FlexSpaceBetween mt="1rem">
        <DescriptionText desc="bold">315 TL</DescriptionText>
        <Modal>
          <Modal.Open opens="addtocart">
            <IconBG>
              <HiOutlinePlus
                fontSize="2rem"
                strokeWidth="2"
                color="var(--oc-red-8)"
              />
            </IconBG>
          </Modal.Open>
          <Modal.Window name="addtocart">
            <AddToCartOverlay />
          </Modal.Window>
        </Modal>
      </FlexSpaceBetween>
    </StyledFoodMenu>
  );
}

export default FoodMenus;
