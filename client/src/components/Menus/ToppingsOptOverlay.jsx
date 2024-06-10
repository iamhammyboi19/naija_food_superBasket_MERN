/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import FlexRow from "../../ui/FlexRow";
import InnerForm from "../../ui/InnerForm";
import InnerInput from "../../ui/InnerInput";
import FormErrorMessage from "../../ui/FormErrorMessage";
import useUpdateOption from "./toppings_hook/useUpdateOption";
import { useParams } from "react-router-dom";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import useAddOption from "./toppings_hook/useAddOption";

// COMPONENT WORKS FOR BOTH CREATING AND UPDATING OPTION DEPENDING ON edit_toppings_opts PROP
function ToppingsOptOverlay({ onCloseModal, edit_toppings_opts = {} }) {
  // get menu id
  const { menu_id } = useParams();

  // check if
  const {
    _id,
    slug: option_slug,
    toppings_slug,
    ...others
  } = edit_toppings_opts;

  const is_edit = Boolean(_id);

  const { update_option_api, is_updating_option } = useUpdateOption();
  const { add_option_api, is_adding_option } = useAddOption();
  const isLoading = is_updating_option || is_adding_option;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...others } });

  function onSubmit(data) {
    if (is_edit) {
      update_option_api({ data, toppings_slug, menu_id, option_slug });
    } else {
      add_option_api({ data, toppings_slug, menu_id });
    }
  }

  return (
    <div>
      {isLoading && <SpinnerMiniContainer />}
      <InnerForm onSubmit={handleSubmit(onSubmit)} onCloseModal={onCloseModal}>
        <FlexRow gap="1rem">
          <InnerInput
            style={{ width: "70%" }}
            placeholder="e.g Pepsi"
            {...register("name", { required: "This field is required" })}
          />
          <InnerInput
            min={0}
            style={{ width: "30%" }}
            type="number"
            {...register("price", {
              required: "This field is required",
              min: { value: 0, message: "Cannot be less than 0" },
            })}
          />
        </FlexRow>
        {errors?.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
        {errors?.price && (
          <FormErrorMessage>{errors.price.message}</FormErrorMessage>
        )}
      </InnerForm>
    </div>
  );
}

export default ToppingsOptOverlay;
