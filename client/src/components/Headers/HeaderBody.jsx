/* eslint-disable react/prop-types */
import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import AutoImages from "../AutoScroll/AutoImages";
import ActionButton from "../../ui/ActionButton";
import { useNavigate } from "react-router-dom";
import useUser from "../Auths/useUser";

const StyledHeaderBody = styled.div`
  max-width: 136rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4rem;
  align-items: center;
  padding: 0rem 3rem;
  margin-top: ${(props) => `${props.$mt}px`};

  @media (max-width: 53.75em) {
    grid-template-columns: 1fr;
    row-gap: 8rem;
    padding: 7rem 4rem 0rem 4rem;
  }
`;

// const HeaderTextCon = styled.div`
//   @media (max-width: 53.75em) {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }
// `;

const StyledTitle = styled.h1`
  font-size: 7rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  letter-spacing: 0.5px;
`;

const SpanBackGround = styled.span`
  display: inline-block;
  background-color: var(--oc-indigo-1);
  padding: ${(props) => props.$pd || "0.1rem 1rem"};
  border-radius: 2rem;
`;

function HeaderBody({ navHeight }) {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <StyledHeaderBody $mt={navHeight}>
      <div>
        <StyledTitle>
          Have you <SpanBackGround>eaten</SpanBackGround> today?{" "}
        </StyledTitle>
        <DescriptionText desc="fade-bold">
          Have meals delivered to you within minutes from a wide variety of
          restaurants ranging from African to Continental cuisines to satisfy
          your cravings.
        </DescriptionText>
        <ActionButton
          mt="2.8rem"
          br="20px"
          width="30%"
          animate="yes"
          hover="yes"
          pd="15px 30px"
          fs="15px"
          onClick={() => {
            if (user) {
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          }}
        >
          Get started
        </ActionButton>
      </div>
      <AutoImages />
    </StyledHeaderBody>
  );
}

export default HeaderBody;
