/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "../../ui/Title";
import DescriptionText from "../../ui/DescriptionText";
import ActionButton from "../../ui/ActionButton";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";

import ToppingsOverlay from "./ToppingsOverlay";
import ToppingsOpts from "./ToppingsOpts";
// import ToppingsOptOverlay from "./ToppingsOptOverlay";
import MenuThumbNail from "./MenuThumbNail";
import Modal from "../../ui/Modal";
import InnerForm from "../../ui/InnerForm";
import InnerInput from "../../ui/InnerInput";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
// import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import { useNavigate } from "react-router-dom";
// ToppingsOptsHeader
// FlexSpaceBetween

const StyledMenuCard = styled.div`
  width: 100%;
  padding: ${(props) => props.$pd || "30px 20px"};
  border: 0.5px solid var(--oc-gray-3);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 4px 0px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  cursor: pointer;
  height: fit-content;
  margin-bottom: 20px;

  @media (max-width: 43.75em) {
    width: 100%;
  }
`;

const MenuCardAndEditCover = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 50px;

  @media (max-width: 67.8125em) {
    grid-template-columns: 1fr;
  }
`;

function MenuView({ menu }) {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      menu_name: menu.menu_name,
      price: menu.price,
      menu_desc: menu.menu_desc,
    },
  });
  const navigate = useNavigate();
  return (
    <div>
      <FlexSpaceBetween>
        <Title as="h3">{menu.menu_name}</Title>
        <ActionButton
          flex="yes"
          br="var(--border-radius-sm)"
          bg="var(--oc-gray-9)"
          bd="var(--oc-gray-9)"
          pd="5px 15px"
          // disabled={is_creating_menu}
          onClick={() => navigate(-1)}
        >
          <IoArrowBack fontSize="2rem" strokeWidth={2} />
          <span>Back</span>
        </ActionButton>
      </FlexSpaceBetween>

      <MenuCardAndEditCover>
        <div>
          <MenuThumbNail menu={menu} />
          <StyledMenuCard>
            <DescriptionText desc="bold">Toppings</DescriptionText>

            <div style={{ marginBottom: "20px" }}>
              <Modal>
                <Modal.Open opens="addnewtoppings">
                  <ActionButton
                    fg="var(--oc-blue-9)"
                    bg="var(--oc-blue-1)"
                    bd="var(--oc-blue-1)"
                    br="var(--border-radius-md)"
                    flex="yes"
                    hover="yes"
                    nfg="var(--oc-white)"
                    nbg="var(--oc-blue-9)"
                    fontW={300}
                    mt="15px"
                  >
                    <HiOutlinePlusSmall
                      style={{ fontSize: "2rem", strokeWidth: "2" }}
                    />
                    <span>
                      <strong>Add new toppings</strong>
                    </span>
                  </ActionButton>
                </Modal.Open>
                <Modal.Window name="addnewtoppings">
                  <ToppingsOverlay />
                </Modal.Window>
              </Modal>
            </div>
            {menu?.toppings?.length > 0 && (
              <>
                {menu.toppings.map((topping) => (
                  <ToppingsOpts topping={topping} key={topping._id} />
                ))}
              </>
            )}
          </StyledMenuCard>
        </div>
        <StyledMenuCard $pd="30px 40px">
          <InnerForm nc="yes" width="100%">
            <DescriptionText desc="semi-bold">Edit menu</DescriptionText>
            <InnerLabelInputDiv nm="no">
              <label htmlFor="menu_name">Menu Name</label>
              <InnerInput
                type="text"
                id="menu_name"
                {...register("menu_name", {
                  required: "This field is required",
                })}
              />
              {errors?.menu_name && (
                <FormErrorMessage>{errors.menu_name.message}</FormErrorMessage>
              )}
            </InnerLabelInputDiv>
            <InnerLabelInputDiv nm="no">
              <label htmlFor="price">Menu Price</label>
              <InnerInput
                min={0}
                type="number"
                id="price"
                {...register("price", {
                  required: "This field is required",
                })}
              />
              {errors?.price && (
                <FormErrorMessage>{errors.price.message}</FormErrorMessage>
              )}
            </InnerLabelInputDiv>
            {/* <InnerLabelInputDiv nm="no">
              <label>Menu image</label>
              <FileInput type="file" accept="image/*" />
            </InnerLabelInputDiv> */}
            <InnerLabelInputDiv nm="no">
              <label htmlFor="menu_desc">Menu desc</label>
              <Textarea
                type="text"
                id="menu_desc"
                {...register("menu_desc", {
                  required: "This field is required",
                })}
              />
              {errors?.menu_desc && (
                <FormErrorMessage>{errors.menu_desc.message}</FormErrorMessage>
              )}
            </InnerLabelInputDiv>
          </InnerForm>
        </StyledMenuCard>
      </MenuCardAndEditCover>
    </div>
  );
}

export default MenuView;
