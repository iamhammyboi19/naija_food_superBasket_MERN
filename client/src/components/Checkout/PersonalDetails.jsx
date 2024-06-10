import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import FlexRow from "../../ui/FlexRow";
import Title from "../../ui/Title";
// import { HiHome } from "react-icons/hi2";
import ActionButton from "../../ui/ActionButton";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import Modal from "../../ui/Modal";
import InnerForm from "../../ui/InnerForm";
import { useForm } from "react-hook-form";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
// import InnerInput from "../../ui/InnerInput";
import FormErrorMessage from "../../ui/FormErrorMessage";
import InputText from "../../ui/InputText";
import useUser from "../Auths/useUser";

const StyledAddress = styled.div`
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0.4px 2px;
  padding: 3rem 2rem;
  /* max-width: 50rem; */
  width: 100%;
  border-radius: var(--border-radius-lg);
  margin-bottom: 2rem;
`;

function PersonalDetails() {
  const { user } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { phone_number: user.phone_number, name: user.name },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <StyledAddress>
      <FlexSpaceBetween>
        <Title as="h3">Personal Information</Title>
        <Modal>
          <Modal.Open opens="checkout_edituserdetails">
            <ActionButton
              fg="var(--oc-red-8)"
              bg="var(--oc-white)"
              bd="var(--oc-white)"
              pr="0rem"
            >
              Edit
            </ActionButton>
          </Modal.Open>
          <Modal.Window name="checkout_edituserdetails">
            <InnerForm
              // type="button"
              onSubmit={handleSubmit(onSubmit)}
              btnName="Update"
            >
              <InnerLabelInputDiv nm="no">
                <label htmlFor="email">Menu Name</label>
                <InputText
                  type="text"
                  disabled={true}
                  value={user.email_address}
                />
              </InnerLabelInputDiv>
              <InnerLabelInputDiv nm="no">
                <label htmlFor="name">Full Name</label>
                <InputText
                  type="text"
                  id="name"
                  {...register("name", { required: "Enter your full name" })}
                />
                {errors?.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </InnerLabelInputDiv>
              <InnerLabelInputDiv nm="no">
                <label htmlFor="phonenumber">Phone Number</label>
                <InputText
                  id="phonenumber"
                  type="tel"
                  {...register("phone_number", {
                    required: "Please provide your phone number",
                  })}
                />
                {errors?.phone_number && (
                  <FormErrorMessage>
                    {errors.phone_number.message}
                  </FormErrorMessage>
                )}
              </InnerLabelInputDiv>
            </InnerForm>
          </Modal.Window>
        </Modal>
      </FlexSpaceBetween>
      <FlexRow fs="yes" gap="0.5rem">
        <div>
          <DescriptionText desc="fade-bold">{user.name}</DescriptionText>
          <DescriptionText desc="semi-bold">
            {user.email_address}
          </DescriptionText>
          <DescriptionText desc="semi-bold">
            {user.phone_number}
          </DescriptionText>
        </div>
      </FlexRow>
    </StyledAddress>
  );
}

export default PersonalDetails;
