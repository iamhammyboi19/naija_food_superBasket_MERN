/* eslint-disable react/prop-types */
import styled from "styled-components";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import InputText from "../ui/InputText";
import { LongFormButton } from "../ui/LongFormButton";
import MaxWidthCenter from "../ui/MaxWidthCenter";

import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/FormErrorMessage";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useRequestEmail from "../components/Auths/useRequestEmail";

const Form = styled.form`
  max-width: 400px;
`;

const OnFormDescription = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 13px;
  color: var(--oc-gray-7);
  font-weight: 600;
  display: inline-block;
  text-align: center;
  margin-top: 20px;
`;

const LabelName = styled.label`
  font-size: 13px;
  color: var(--oc-gray-9);
  font-weight: 300;
`;

function RequestEmail({ reason }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useDocumentTitle(reason);

  const { isPending, mutate } = useRequestEmail();

  function onSubmit(data) {
    mutate(
      { data },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <>
      <MaxWidthCenter pd="5rem 5rem" mt="100px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <OnFormDescription>{reason}</OnFormDescription>
          <InnerLabelInputDiv>
            <LabelName>Email</LabelName>
            <InputText
              placeholder="Email"
              {...register("email_address", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors?.email_address && (
              <FormErrorMessage>
                {errors.email_address.message}
              </FormErrorMessage>
            )}
          </InnerLabelInputDiv>
          <LongFormButton disabled={isPending}>Continue</LongFormButton>
        </Form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <StyledLink to="/login">Back to Log in</StyledLink>
        </div>
      </MaxWidthCenter>
    </>
  );
}

export default RequestEmail;
