/* eslint-disable react/prop-types */
import { useState } from "react";
import ActionButton from "../../ui/ActionButton";
import DescriptionText from "../../ui/DescriptionText";
import FlexRow from "../../ui/FlexRow";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import InnerForm from "../../ui/InnerForm";
import InnerInput from "../../ui/InnerInput";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import { useParams } from "react-router-dom";
import useToppings from "./toppings_hook/useToppings";
import useUpdateToppings from "./toppings_hook/useUpdateToppings";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";

// COMPONENT WORKS FOR BOTH CREATING AND UPDATING OPTION DEPENDING ON edit_toppings PROP
function ToppingsOverlay({ onCloseModal, edit_toppings = {} }) {
  // plan is to use same form component for creating and editing
  const { menu_id } = useParams();
  const { _id, slug: toppings_slug, ...others } = edit_toppings;
  const is_edit = Boolean(_id);
  const { add_toppings_api, is_adding_toppings } = useToppings();
  const { update_toppings_api, is_updating_toppings } = useUpdateToppings();
  const isLoading = is_adding_toppings || is_updating_toppings;

  const [compulsory, setCompulsory] = useState(
    edit_toppings.compulsory || false
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { ...others } });

  function onSubmit(data) {
    const newdata = { ...data, compulsory };
    if (is_edit) {
      update_toppings_api({ data: newdata, menu_id, toppings_slug });
    } else {
      add_toppings_api({ menu_id, data: newdata });
    }
  }

  return (
    <div>
      {isLoading && <SpinnerMiniContainer />}
      <InnerForm onSubmit={handleSubmit(onSubmit)} onCloseModal={onCloseModal}>
        <DescriptionText desc="semi-bold">Toppings & Extras</DescriptionText>
        <InnerInput
          placeholder="e.g Drinks"
          {...register("toppings_name", { required: "This field is required" })}
        />
        <FlexRow gap="0px">
          <ActionButton
            fw="yes"
            btl="var(--border-radius-sm)"
            bbl="var(--border-radius-sm)"
            bg={!compulsory ? "var(--oc-gray-3)" : "var(--oc-white)"}
            fg={!compulsory ? "var(--oc-gray-7)" : "var(--oc-gray-6)"}
            bd="var(--oc-gray-5)"
            onClick={() => setCompulsory(false)}
            type="button"
          >
            Optional
          </ActionButton>
          <ActionButton
            fw="yes"
            btr="var(--border-radius-sm)"
            bbr="var(--border-radius-sm)"
            bg={compulsory ? "var(--oc-gray-3)" : "var(--oc-white)"}
            fg={compulsory ? "var(--oc-gray-7)" : "var(--oc-gray-6)"}
            bd="var(--oc-gray-5)"
            onClick={() => setCompulsory(true)}
            type="button"
          >
            Mandatory
          </ActionButton>
        </FlexRow>

        {compulsory && (
          <>
            <FlexSpaceBetween>
              <DescriptionText desc="semi-bold">
                Minimum selection
              </DescriptionText>
              <InnerInput
                style={{ width: "40%" }}
                {...register("min_selection", {
                  required: "This field is required",
                  min: { value: 1, message: "Value cannot be less than 1" },
                })}
              />
              {errors?.min_selection && (
                <FormErrorMessage>
                  {errors.min_selection.message}
                </FormErrorMessage>
              )}
            </FlexSpaceBetween>
            <FlexSpaceBetween>
              <DescriptionText desc="semi-bold">
                Maximum selection
              </DescriptionText>
              <InnerInput
                style={{ width: "40%" }}
                {...register("max_selection", {
                  required: "This field is required",
                  min: { value: 1, message: "Value cannot be less than 1" },
                })}
              />
              {errors?.max_selection && (
                <FormErrorMessage>
                  {errors.max_selection.message}
                </FormErrorMessage>
              )}
            </FlexSpaceBetween>
          </>
        )}
      </InnerForm>
    </div>
  );
}

export default ToppingsOverlay;
