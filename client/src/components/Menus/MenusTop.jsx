import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import ActionButton from "../../ui/ActionButton";
import { HiOutlinePlus } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import InnerForm from "../../ui/InnerForm";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import Title from "../../ui/Title";
import InputText from "../../ui/InputText";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import useCreateMenu from "./useCreateMenu";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
// import styled from "styled-components";

function MenusTop() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const { create_menu_api, is_creating_menu } = useCreateMenu();

  const watchfields = watch(["menu_name", "price", "menu_desc", "nfsB_images"]);

  const restrict_submit =
    watchfields.at(0) !== "" &&
    watchfields.at(1) !== "" &&
    watchfields.at(2) !== "" &&
    watchfields.at(3)?.length > 0;

  function onSubmit(data) {
    // check for image upload and extract it
    const newdata =
      data.nfsB_images.length > 0
        ? {
            ...data,
            nfsB_images: data.nfsB_images["0"],
          }
        : data;

    create_menu_api({ data: newdata });
  }

  return (
    <div>
      {is_creating_menu && <SpinnerMiniContainer />}
      <Modal>
        <FlexSpaceBetween>
          <Title as="h2">Menus</Title>
          <Modal.Open opens="addnewmenu">
            <ActionButton
              flex="yes"
              br="var(--border-radius-sm)"
              bg="var(--oc-violet-6)"
              bd="var(--oc-violet-9)"
              pd="5px 15px"
              disabled={is_creating_menu}
            >
              <HiOutlinePlus fontSize="2rem" strokeWidth={2} />
              <span>New</span>
            </ActionButton>
          </Modal.Open>
        </FlexSpaceBetween>
        <Modal.Window name="addnewmenu">
          <InnerForm
            isLoading={is_creating_menu}
            onSubmit={handleSubmit(onSubmit)}
            btnName="Create menu"
            restrict_submit={!restrict_submit}
          >
            <Title as="h5">Create a new menu</Title>
            <InnerLabelInputDiv nm="no">
              <label htmlFor="menu_name">Menu Name</label>
              <InputText
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
              <InputText
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
            <InnerLabelInputDiv nm="no">
              <label htmlFor="nfsB_images">Menu image</label>
              <FileInput
                type="file"
                id="nfsB_images"
                accept="image/*"
                name="nfsB_images"
                {...register("nfsB_images", {
                  required: "This field is required",
                })}
              />
              {errors?.menu_image && (
                <FormErrorMessage>{errors.menu_image.message}</FormErrorMessage>
              )}
            </InnerLabelInputDiv>
            <InnerLabelInputDiv nm="no">
              <label htmlFor="menu_desc">Menu desc</label>
              <Textarea
                type="text"
                {...register("menu_desc", {
                  required: "This field is required",
                })}
              />
              {errors?.menu_desc && (
                <FormErrorMessage>{errors.menu_desc.message}</FormErrorMessage>
              )}
            </InnerLabelInputDiv>
          </InnerForm>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default MenusTop;
