import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import DescriptionText from "../ui/DescriptionText";
import { LongFormButton } from "../ui/LongFormButton";
import MaxWidthCenter from "../ui/MaxWidthCenter";
import useConfirmSignup from "../components/Auths/useConfirmSignup";
import Spinner from "../ui/Spinner";
import styled from "styled-components";

const StyledProtectedRoute = styled.div`
  height: 100vh;
  background-color: var(--oc-white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ConfirmToken() {
  const navigate = useNavigate();

  useDocumentTitle("Verify email token");

  const { error, isSuccess, isLoading, message } = useConfirmSignup();

  if (isLoading) {
    return (
      <StyledProtectedRoute>
        <Spinner />
      </StyledProtectedRoute>
    );
  }

  if (!isLoading && !isSuccess && error) {
    return (
      <MaxWidthCenter mw="500px" mt="90px">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <DescriptionText desc="bold">{error.message}</DescriptionText>
          <DescriptionText desc="semi-tiny">
            Please request for a new email verification token by clicking on the
            button below
          </DescriptionText>
          <LongFormButton
            onClick={() => navigate("/requestemail", { replace: true })}
          >
            Request Email
          </LongFormButton>
        </div>
      </MaxWidthCenter>
    );
  }

  if (isSuccess) {
    return (
      <MaxWidthCenter mw="500px" mt="90px">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <DescriptionText desc="bold">{message}</DescriptionText>
          <DescriptionText desc="semi-tiny">
            Click on the button below to proceed
          </DescriptionText>
          <LongFormButton onClick={() => navigate("/", { replace: true })}>
            Go to Dashboard
          </LongFormButton>
        </div>
      </MaxWidthCenter>
    );
  }
}

export default ConfirmToken;
