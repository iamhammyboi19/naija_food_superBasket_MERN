import styled from "styled-components";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InputText from "../../ui/InputText";
import { LongFormButton } from "../../ui/LongFormButton";
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

function Login() {
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
      <MaxWidthCenter>
        <Form>
          <OnFormDescription>Log in your account</OnFormDescription>
          <InnerLabelInputDiv>
            <LabelName>Email</LabelName>
            <InputText placeholder="Email" />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <LabelName>Password</LabelName>
            <InputText placeholder="Password" />
          </InnerLabelInputDiv>
          <LongFormButton>Continue</LongFormButton>
        </Form>
      </MaxWidthCenter>
    </>
  );
}

export default Login;
