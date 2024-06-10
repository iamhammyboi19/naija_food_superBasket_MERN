import styled from "styled-components";
import InnerForm from "../../ui/InnerForm";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import StyledSelect from "../../ui/Select";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
// import FileInput from "../../ui/FileInput";

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

function UserUpdate() {
  const { role, user } = useUser();
  const { update_user, is_updating_user } = useUpdateUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user.name,
      restaurant_name: user.restaurant_name,
      business_reg_no: user.business_reg_no,
      service_type: user.service_type,
    },
  });

  function onSubmit(data) {
    update_user({ data });
  }

  return (
    <DivCon>
      {is_updating_user && <SpinnerMiniContainer />}
      <h5
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: 500,
        }}
      >
        Update user
      </h5>

      <InnerForm
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
        btnName={"Save Changes"}
        nc="yes"
      >
        <InnerLabelInputDiv nm="no">
          <label>Full Name</label>
          <InputText
            {...register("name", { required: "Enter your full name" })}
          />
          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        {role === "restaurant" && (
          <>
            {" "}
            <InnerLabelInputDiv nm="no">
              <label>Restaurant name</label>
              <InputText
                {...register("restaurant_name", {
                  required: "Enter your restaurant name",
                })}
              />
              {errors?.restaurant_name && (
                <FormErrorMessage>
                  {errors.restaurant_name.message}
                </FormErrorMessage>
              )}
            </InnerLabelInputDiv>
            <InnerLabelInputDiv nm="no">
              <label>Business Reg No</label>
              <InputText
                {...register("business_reg_no", {
                  required: "Please provide business reg no",
                })}
              />
              {errors?.business_reg_no && (
                <FormErrorMessage>
                  {errors.business_reg_no.message}
                </FormErrorMessage>
              )}
            </InnerLabelInputDiv>
            <InnerLabelInputDiv>
              <label>Service Type</label>
              <StyledSelect
                {...register("service_type", {
                  required: "Please select a service type",
                })}
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
                <option value="delivery and pickup">Delivery and Pickup</option>
              </StyledSelect>
              {errors?.service_type && (
                <FormErrorMessage>
                  {errors.service_type.message}
                </FormErrorMessage>
              )}
            </InnerLabelInputDiv>
          </>
        )}
      </InnerForm>
    </DivCon>
  );
}

export default UserUpdate;
