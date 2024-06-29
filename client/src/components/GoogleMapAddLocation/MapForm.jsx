/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import FlexRow from "../../ui/FlexRow";
import FormErrorMessage from "../../ui/FormErrorMessage";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
// import styled from "styled-components";
import { LongFormButton } from "../../ui/LongFormButton";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useAddLocation from "./useAddLocation";
import useUser from "../Auths/useUser";

// const LabelName = styled.label`
//   font-size: 1.3rem;
//   color: var(--oc-gray-9);
//   font-weight: 300;
// `;

function MapForm({ lat, lng }) {
  const { user } = useUser();
  const address = user?.location?.at(0)?.address;

  // get and set ComboboxInput on render
  const { initialAddress } = useSelector((state) => state.latlng);
  const { is_adding_location, add_location } = useAddLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      suburb: initialAddress || address?.suburb || "",
      street_name: address?.street_name || "",
      building_name: address?.building_name || "",
      door_number: address?.door_number || "",
      floor_number: address?.floor_number || "",
      direction: address?.direction || "",
    },
  });

  function onSubmit(data) {
    if (!lat || !lng) {
      return toast.error("User did not provide lat or lng");
    }

    const newdata = {
      type: "Point",
      // lng, lat
      coordinate: [lng, lat],
      address: {
        ...data,
      },
    };

    add_location({ data: newdata });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
      <InnerLabelInputDiv>
        <InputText
          placeholder="Suburb"
          {...register("suburb", {
            required: "Suburb address is required",
          })}
          defaultValue={initialAddress || ""}
        />
        {errors?.suburb && (
          <FormErrorMessage>{errors.suburb.message}</FormErrorMessage>
        )}
      </InnerLabelInputDiv>
      <FlexRow>
        <InnerLabelInputDiv>
          <InputText
            placeholder="Street name"
            {...register("street_name", {
              required: "Street name is required",
            })}
          />
          {errors?.street_name && (
            <FormErrorMessage>{errors.street_name.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        <InnerLabelInputDiv>
          <InputText
            placeholder="Building name"
            {...register("building_name", {
              required: "Building name is required",
            })}
          />
          {errors?.building_name && (
            <FormErrorMessage>{errors.building_name.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
      </FlexRow>
      <FlexRow>
        <InnerLabelInputDiv>
          <InputText
            placeholder="Door number"
            {...register("door_number", {
              required: "Door number is required",
            })}
          />
          {errors?.door_number && (
            <FormErrorMessage>{errors.door_number.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        <InnerLabelInputDiv>
          <InputText
            placeholder="Floor number"
            {...register("floor_number", {
              required: "Floor number is required",
            })}
          />
          {errors?.floor_number && (
            <FormErrorMessage>{errors.floor_number.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
      </FlexRow>
      <InnerLabelInputDiv>
        <InputText
          placeholder="Direction"
          {...register("direction", {
            required: "Direction is required",
          })}
        />
        {errors?.direction && (
          <FormErrorMessage>{errors.direction.message}</FormErrorMessage>
        )}
      </InnerLabelInputDiv>
      <LongFormButton disabled={is_adding_location}>
        Save and continue
      </LongFormButton>
    </form>
  );
}

export default MapForm;

/*
{
  type:"Point",
  coordinate:[3.3685504,6.6387968],
  address:{
    street_name:"Rev Emmanuel Abubifa street",
    building_name:"Brown house",
    door_number:"857b",
    floor_number:"Ground floor"
  }
}

*/
