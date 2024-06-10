import styled, { css } from "styled-components";
import ActionButton from "../../ui/ActionButton";
import DescriptionText from "../../ui/DescriptionText";
import FlexRow from "../../ui/FlexRow";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";

const StyledBorder = styled.div`
  padding: ${(props) => props.$pd || "30px 10px"};
  border-bottom: 0.5px solid var(--oc-gray-4);

  /* ${(props) =>
    props.$flex &&
    css`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `} */
`;

const StyledOrderOverLay = styled.div`
  width: 500px;

  @media (max-width: 45.1875em) {
    width: 100%;
    height: 100vh;
  }
`;

function OrderOverLay() {
  // ACCEPT OR REJECT ORDER THROUGH ORDER DETAILS OVERLAY
  return (
    <div>
      <StyledOrderOverLay>
        <StyledBorder $pd="35px 20px 25px 20px">
          <FlexSpaceBetween>
            <DescriptionText desc="bold">#Order number</DescriptionText>
            <DescriptionText desc="tiny">minutes ago</DescriptionText>
          </FlexSpaceBetween>
          <FlexRow gap="1rem" mt="20px">
            <ActionButton
              bd="var(--oc-gray-3)"
              bg="var(--oc-gray-3)"
              br="var(--border-radius-xlg)"
              fg="var(--oc-gray-6)"
              pd="0.5rem 2rem"
              fs="1rem"
              fontW={300}
            >
              Status
            </ActionButton>
            <ActionButton
              bd="var(--oc-gray-3)"
              bg="var(--oc-gray-3)"
              br="var(--border-radius-xlg)"
              fg="var(--oc-gray-6)"
              pd="0.5rem 2rem"
              fs="1rem"
              fontW={300}
            >
              Card
            </ActionButton>
          </FlexRow>
        </StyledBorder>
        <div style={{ padding: "25px" }}>
          <StyledBorder $pd="12px 0px">
            <FlexSpaceBetween>
              <FlexRow>
                <ActionButton
                  bd="var(--oc-gray-3)"
                  bg="var(--oc-gray-3)"
                  br="50%"
                  fg="var(--oc-gray-9)"
                  pd="0.5rem 0.5rem"
                  fs="1rem"
                  fontW={600}
                >
                  1
                </ActionButton>
                <FlexRow cd="column" gap="0.5rem" fs="yes">
                  <DescriptionText desc="bold">Menu name</DescriptionText>
                  <DescriptionText desc="semi-tiny">
                    Menu description
                  </DescriptionText>
                </FlexRow>
              </FlexRow>
              <FlexRow cd="column" gap="0.5rem" fs="yes">
                <DescriptionText desc="bold">2500</DescriptionText>
                <DescriptionText desc="fade-bold">2500</DescriptionText>
              </FlexRow>
            </FlexSpaceBetween>
          </StyledBorder>
          <StyledBorder $pd="12px 0px">
            <FlexSpaceBetween>
              <FlexRow>
                <ActionButton
                  bd="var(--oc-gray-3)"
                  bg="var(--oc-gray-3)"
                  br="50%"
                  fg="var(--oc-gray-9)"
                  pd="0.5rem 0.5rem"
                  fs="1rem"
                  fontW={600}
                >
                  1
                </ActionButton>
                <FlexRow cd="column" gap="0.5rem" fs="yes">
                  <DescriptionText desc="bold">Menu name</DescriptionText>
                  <DescriptionText desc="semi-tiny">
                    Menu description
                  </DescriptionText>
                </FlexRow>
              </FlexRow>
              <FlexRow cd="column" gap="0.5rem" fs="yes">
                <DescriptionText desc="bold">2500</DescriptionText>
                <DescriptionText desc="fade-bold">2500</DescriptionText>
              </FlexRow>
            </FlexSpaceBetween>
          </StyledBorder>

          <StyledBorder $pd="12px 0px 40px 0px">
            <FlexSpaceBetween>
              <DescriptionText desc="tiny">Total order(credit)</DescriptionText>
              <DescriptionText desc="bold">2500</DescriptionText>
            </FlexSpaceBetween>
          </StyledBorder>

          <FlexSpaceBetween mt="2.5rem">
            <DescriptionText desc="true">
              Will be rejected automatically in (900)
            </DescriptionText>
            <FlexRow gap="0.5rem">
              <ActionButton
                bd="var(--oc-gray-3)"
                bg="var(--oc-gray-1)"
                br="var(--border-radius-xlg)"
                fg="var(--oc-gray-7)"
                pd="0.5rem 2rem"
                fs="1.4rem"
              >
                Reject
              </ActionButton>
              <ActionButton
                bd="var(--oc-yellow-3)"
                bg="var(--oc-yellow-3)"
                br="var(--border-radius-xlg)"
                fg="var(--oc-gray-7)"
                pd="0.5rem 2rem"
                fs="1.4rem"
              >
                Accept
              </ActionButton>
            </FlexRow>
          </FlexSpaceBetween>
        </div>
      </StyledOrderOverLay>
    </div>
  );
}

export default OrderOverLay;
