import styled from "styled-components";
import InnerForm from "../../ui/InnerForm";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import { useUpdatePassword } from "./useUpdatePassword";
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

function PasswordUpdate() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const { update_password_api, is_updating_password } = useUpdatePassword();

  function onSubmit(data) {
    update_password_api({ data });
  }

  return (
    <DivCon>
      {is_updating_password && <SpinnerMiniContainer />}
      <h5
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: 500,
        }}
      >
        Update password
      </h5>

      <InnerForm
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
        btnName={"Save Changes"}
        nc="yes"
      >
        <InnerLabelInputDiv nm="no">
          <label>Current password</label>
          <InputText
            type="password"
            {...register("current_password", {
              required: "Please provide your current password",
            })}
          />
          {errors?.current_password && (
            <FormErrorMessage>
              {errors.current_password.message}
            </FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        <InnerLabelInputDiv nm="no">
          <label>New Password</label>
          <InputText
            type="password"
            {...register("password", {
              required: "Please provide your new password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors?.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
        <InnerLabelInputDiv nm="no">
          <label>Confirm new password</label>
          <InputText
            type="password"
            {...register("confirmpassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === getValues("password") ||
                "Must be same as new password",
            })}
          />
          {errors?.confirmpassword && (
            <FormErrorMessage>
              {errors.confirmpassword.message}
            </FormErrorMessage>
          )}
        </InnerLabelInputDiv>
      </InnerForm>
    </DivCon>
  );
}

export default PasswordUpdate;
