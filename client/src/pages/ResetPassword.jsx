/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import InputText from "../ui/InputText";
import { LongFormButton } from "../ui/LongFormButton";
import MaxWidthCenter from "../ui/MaxWidthCenter";

import FormErrorMessage from "../ui/FormErrorMessage";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useResetPassword from "../components/Auths/useResetPassword";

const Form = styled.form`
  max-width: 400px;
`;

const OnFormDescription = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const LabelName = styled.label`
  font-size: 13px;
  color: var(--oc-gray-9);
  font-weight: 300;
`;

function ResetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const { token } = useParams();
  const { isPending, mutate } = useResetPassword();

  useDocumentTitle("Reset your password");

  function onSubmit(data) {
    mutate({ token, data });
  }

  return (
    <>
      <MaxWidthCenter mt="100px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <OnFormDescription>Reset your password</OnFormDescription>
          <InnerLabelInputDiv>
            <LabelName>Password</LabelName>
            <InputText
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
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
          <InnerLabelInputDiv>
            <LabelName>Confirm password</LabelName>
            <InputText
              placeholder="Confirm Password"
              type="password"
              {...register("confirmpassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === getValues("password") || "Must be same as password",
              })}
            />
            {errors?.confirmpassword && (
              <FormErrorMessage>
                {errors.confirmpassword.message}
              </FormErrorMessage>
            )}
          </InnerLabelInputDiv>
          <LongFormButton disabled={isPending}>Continue</LongFormButton>
        </Form>
      </MaxWidthCenter>
    </>
  );
}

export default ResetPassword;
