import styled from "styled-components";
import InnerForm from "../../ui/InnerForm";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import FileInput from "../../ui/FileInput";
import Select from "../../ui/Select";
import FlexRow from "../../ui/FlexRow";
// FlexRow
import { daysOptions } from "../../ui/SelectDays";
import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useMenuOverview } from "./useMenuOverview";
import toast from "react-hot-toast";
import useUser from "./useUser";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";

const DivCon = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  border: 0.5px solid #d6d6d6;
  padding: 25px 30px;
  margin-bottom: 20px;
  border-radius: var(--border-radius-sm);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;

  @media (max-width: 48.875em) {
    padding: 2.5rem;
  }
`;

function UpdateMenuOverview() {
  const {
    user: {
      menu_overview: {
        delivery_fee,
        minimum_purchase,
        open_day_start,
        open_day_end,
        open_hour: open,
        close_hour: close,
      },
    },
  } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      delivery_fee,
      minimum_purchase,
      open_day_start,
      open_day_end,
    },
  });

  const { update_menu_overview, is_updating_menu_overview } = useMenuOverview();

  const [open_hour, onChangeOpen] = useState(open || "10:00");
  const [close_hour, onChangeClose] = useState(close || "12:00");

  function onSubmit(data) {
    if (!open_hour || !close_hour) {
      return toast.error("Please provide open and close hour", {
        duration: 4000,
      });
    }

    if (
      data.open_day_end === data.open_day_start ||
      data.open_day_end < data.open_day_start
    ) {
      return toast.error("Use Sunday to Saturday instead", { duration: 4000 });
    }

    const newdata =
      data.nfsB_images.length > 0
        ? {
            ...data,
            nfsB_images: data.nfsB_images["0"],
            open_hour,
            close_hour,
          }
        : { ...data, open_hour, close_hour };

    update_menu_overview({ data: newdata });
  }

  return (
    <DivCon>
      {is_updating_menu_overview && <SpinnerMiniContainer />}
      <h5
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: 500,
        }}
      >
        Restaurant Overview
      </h5>

      <InnerForm
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
        btnName={"Save Changes"}
        nc="yes"
        isLoading={is_updating_menu_overview}
      >
        <InnerLabelInputDiv nm="no">
          <label>Minimum Purchase For Delivery</label>
          <InputText
            {...register("minimum_purchase", {
              required: "Enter minimum purchase",
              min: { value: 0, message: "Cannot be less than 0" },
            })}
            type="number"
          />
          {errors?.minimum_purchase && (
            <FormErrorMessage>
              {errors.minimum_purchase.message}
            </FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        <InnerLabelInputDiv nm="no">
          <label>Delivery Fee</label>
          <InputText
            {...register("delivery_fee", {
              required: "Enter delivery fee",
              min: { value: 0, message: "Cannot be less than 0" },
            })}
            type="number"
          />
          {errors?.delivery_fee && (
            <FormErrorMessage>{errors.delivery_fee.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        <InnerLabelInputDiv nm="no">
          <label>Cover Photo</label>
          <FileInput
            id="nfsB_images"
            name="nfsB_images"
            type="file"
            accept="image/*"
            {...register("nfsB_images", {
              // required: "This field is required",
            })}
          />
        </InnerLabelInputDiv>
        <FlexRow>
          <InnerLabelInputDiv nm="no">
            <label>From day</label>
            <Select id="startDate" {...register("open_day_start")}>
              {daysOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </InnerLabelInputDiv>
          <InnerLabelInputDiv nm="no">
            <label>To day</label>
            <Select id="endDate" label="To day" {...register("open_day_end")}>
              {daysOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </InnerLabelInputDiv>
        </FlexRow>
        <FlexRow>
          <InnerLabelInputDiv>
            <label>Open Hour</label>
            <TimePicker onChange={onChangeOpen} value={open_hour} />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <label>Close Hour</label>
            <TimePicker onChange={onChangeClose} value={close_hour} />
          </InnerLabelInputDiv>
        </FlexRow>
      </InnerForm>
    </DivCon>
  );
}

// onChange={onChangeOpen} value={open_hour}
// onChange={onChangeClose} value={close_hour}

export default UpdateMenuOverview;
