import styled from "styled-components";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { LongFormButton } from "../../ui/LongFormButton";
import RadioInput from "../../ui/RadioInput";
import MaxWidthCenter from "../../ui/MaxWidthCenter";
import Logo from "../Headers/Logo";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../ui/FormErrorMessage";
import { Link } from "react-router-dom";
import DescriptionText from "../../ui/DescriptionText";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useSignup from "./useSignup";
import StyledSelect from "../../ui/Select";

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
`;

const LabelName = styled.label`
  font-size: 1.3rem;
  color: var(--oc-gray-9);
  font-weight: 300;
`;

function Signup() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    unregister,
    // reset,
  } = useForm({ defaultValues: { role: "user" } });

  const watchRole = watch("role");

  const { mutate, isPending } = useSignup();

  useDocumentTitle("Signup - Naija Food superBasket");

  function onSubmit(data) {
    console.log("data", data);
    mutate(data);
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
          <OnFormDescription>Sign up</OnFormDescription>

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
            <LabelName>Full Name</LabelName>
            <InputText
              placeholder="Full Name"
              {...register("name", { required: "Enter your full name" })}
            />
            {errors?.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <LabelName>Password</LabelName>
            <InputText
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Please provide your password",
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
            <LabelName>Phone Number</LabelName>
            <InputText
              placeholder="Phone number"
              type="tel"
              {...register("phone_number", {
                required: "Please provide your phone number",
              })}
            />
            {errors?.phone_number && (
              <FormErrorMessage>{errors.phone_number.message}</FormErrorMessage>
            )}
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <LabelName>Role</LabelName>
            <RadioInput>
              <RadioInput.Wrapper>
                <RadioInput.Input
                  type="radio"
                  name="role"
                  id="user"
                  value="user"
                  {...register("role")}
                  onClick={() => {
                    unregister("restaurant_name");
                    unregister("business_reg_no");
                  }}
                />
                <RadioInput.Label htmlFor="user">User</RadioInput.Label>
              </RadioInput.Wrapper>
              <RadioInput.Wrapper>
                <RadioInput.Input
                  type="radio"
                  name="role"
                  id="restaurant"
                  value="restaurant"
                  {...register("role")}
                />
                <RadioInput.Label htmlFor="restaurant">
                  Restaurant
                </RadioInput.Label>
              </RadioInput.Wrapper>
            </RadioInput>
          </InnerLabelInputDiv>
          {watchRole === "restaurant" && (
            <>
              <InnerLabelInputDiv>
                <LabelName>Restaurant Name</LabelName>
                <InputText
                  placeholder="Restaurant Name"
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
              <InnerLabelInputDiv>
                <LabelName>Service Type</LabelName>
                <StyledSelect
                  defaultValue={"pickup"}
                  {...register("service_type")}
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                  <option value="delivery and pickup">
                    Delivery and Pickup
                  </option>
                </StyledSelect>
              </InnerLabelInputDiv>{" "}
              <InnerLabelInputDiv>
                <LabelName>Business Reg No</LabelName>
                <InputText
                  placeholder="Business Reg No"
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
            </>
          )}
          <LongFormButton disabled={isPending}>Continue</LongFormButton>
        </Form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            fontWeight: 600,
            gap: "5px",
            alignItems: "center",
          }}
        >
          <DescriptionText desc="true">
            Already have an account?
          </DescriptionText>
          <StyledLink to="/login">Log in</StyledLink>
        </div>
      </MaxWidthCenter>
    </>
  );
}

export default Signup;
