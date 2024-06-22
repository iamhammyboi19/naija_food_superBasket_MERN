import styled from "styled-components";
import InnerForm from "../../ui/InnerForm";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import useUser from "./useUser";

const DivCon = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  border: 0.5px solid #d6d6d6;
  padding: 25px 30px;
  margin-bottom: 20px;
  margin-top: 35px;
  border-radius: var(--border-radius-sm);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;

  @media (max-width: 48.875em) {
    padding: 2.5rem;
  }
`;

function EmailUpdate() {
  const { user } = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { email_address: user.email_address } });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <DivCon>
      <h5
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: 500,
        }}
      >
        Update email address
      </h5>

      <InnerForm
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
        nc="yes"
        btnName={"Save Changes"}
        restrict_submit={true}
      >
        <InnerLabelInputDiv>
          <label>Email address</label>
          <InputText
            {...register("email_address", {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          {errors?.email_address && (
            <FormErrorMessage>{errors.email_address.message}</FormErrorMessage>
          )}
        </InnerLabelInputDiv>
      </InnerForm>
    </DivCon>
  );
}

export default EmailUpdate;
