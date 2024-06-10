import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import DescriptionText from "../ui/DescriptionText";
import { LongFormButton } from "../ui/LongFormButton";
import MaxWidthCenter from "../ui/MaxWidthCenter";

function Confirmation() {
  const navigate = useNavigate();
  useDocumentTitle("Verify email");

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
        <DescriptionText desc="bold">
          Please verify your email address to proceed
        </DescriptionText>
        <DescriptionText desc="semi-tiny">
          If you did not receive any mail in your inbox within 7 mins click on
          the button below and request for a new email verification
        </DescriptionText>
        <LongFormButton
          onClick={() => navigate("/requestemail", { replace: true })}
        >
          Request new email
        </LongFormButton>
      </div>
    </MaxWidthCenter>
  );
}

export default Confirmation;
