import styled from "styled-components";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { LongFormButton } from "../../ui/LongFormButton";
import MaxWidthCenter from "../../ui/MaxWidthCenter";
import Logo from "../Headers/Logo";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useLogin from "./useLogin";

const Form = styled.form`
  max-width: 400px;
`;

const OnFormDescription = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const LabelName = styled.label`
  font-size: 1.3rem;
  color: var(--oc-gray-9);
  font-weight: 300;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 13px;
  color: var(--oc-gray-7);
`;

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate, isPending } = useLogin();

  useDocumentTitle("Log in - Naija Food superBasket");

  function onSubmit(data) {
    mutate({ data }, { onSettled: () => reset() });
  }

  return (
    <>
      <div
        style={{
          padding: "20px 0 20px 20px",
          borderBottom: "1px solid var(--oc-gray-3)",
        }}
      >
        <Logo />
      </div>
      <MaxWidthCenter pd="5rem 5rem" mt="50px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <OnFormDescription>Log in your account</OnFormDescription>
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
          <InnerLabelInputDiv>
            <FlexSpaceBetween>
              <LabelName>Password</LabelName>
              <StyledLink to="/forgotpassword">Forgot password?</StyledLink>
            </FlexSpaceBetween>
            <InputText
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Please provide your password",
                minLength: {
                  value: 8,
                  message: "Password but be at least 8 characters",
                },
              })}
            />
            {errors?.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </InnerLabelInputDiv>
          <LongFormButton disabled={isPending}>Continue</LongFormButton>
        </Form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            fontWeight: 600,
          }}
        >
          <StyledLink to="/signup">Signup</StyledLink>
        </div>
      </MaxWidthCenter>
    </>
  );
}

export default Login;
