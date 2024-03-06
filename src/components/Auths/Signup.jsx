import styled from "styled-components";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { LongFormButton } from "../../ui/LongFormButton";
import RadioInput from "../../ui/RadioInput";
import { useState } from "react";
import MaxWidthCenter from "../../ui/MaxWidthCenter";
import Logo from "../Headers/Logo";

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

function Signup() {
  const [role, setRole] = useState("user");
  return (
    <>
      <div
        style={{
          padding: "30px 0 0 30px",
          borderBottom: "1px solid var(--oc-gray-3)",
        }}
      >
        <Logo />
      </div>
      <MaxWidthCenter>
        <Form>
          <OnFormDescription>Sign up</OnFormDescription>
          <InnerLabelInputDiv>
            <LabelName>Email</LabelName>
            <InputText placeholder="Email" />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <LabelName>Full Name</LabelName>
            <InputText placeholder="Full Name" />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <LabelName>Password</LabelName>
            <InputText placeholder="Password" />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <LabelName>Phone Number</LabelName>
            <InputText placeholder="Phone number" />
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
                  onChange={(e) => setRole(e.target.value)}
                />
                <RadioInput.Label htmlFor="user">User</RadioInput.Label>
              </RadioInput.Wrapper>
              <RadioInput.Wrapper>
                <RadioInput.Input
                  type="radio"
                  name="role"
                  id="restaurant"
                  value="restaurant"
                  onChange={(e) => setRole(e.target.value)}
                />
                <RadioInput.Label htmlFor="restaurant">
                  Restaurant
                </RadioInput.Label>
              </RadioInput.Wrapper>
            </RadioInput>
          </InnerLabelInputDiv>
          {role === "restaurant" && (
            <>
              <InnerLabelInputDiv>
                <LabelName>Restaurant Name</LabelName>
                <InputText placeholder="Restaurant Name" />
              </InnerLabelInputDiv>
              <InnerLabelInputDiv>
                <LabelName>Business Reg No</LabelName>
                <InputText placeholder="Business Reg No" />
              </InnerLabelInputDiv>
            </>
          )}
          <LongFormButton>Continue</LongFormButton>
        </Form>
      </MaxWidthCenter>
    </>
  );
}

export default Signup;
