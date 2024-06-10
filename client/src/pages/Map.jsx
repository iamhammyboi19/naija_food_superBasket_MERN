// import DisplayMap from "../components/GoogleMapAddLocation/DisplayMap";

import styled, { css } from "styled-components";
import Title from "../ui/Title";
import ActionButton from "../ui/ActionButton";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FlexRow from "../ui/FlexRow";
import FlexSpaceBetween from "../ui/FlexSpaceBetween";
import DescriptionText from "../ui/DescriptionText";
import TimeLine from "../components/TimeLine/TimeLine";

const NewDescText = styled.span`
  font-size: 1.1rem;
  background-color: var(--oc-green-1);
  padding: 4px 12px;
  text-align: center;
  border-radius: var(--border-radius-lg);
  color: var(--oc-green-9);
  font-weight: 500;
  width: fit-content;

  @media (max-width: 31.25em) {
    font-size: 0.8rem;
    padding: 2px 6px;
  }
`;

const StyledBorder = styled.div`
  padding: 20px 10px;
  border-bottom: 0.5px solid var(--oc-gray-5);

  ${(props) =>
    props.$flex &&
    css`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `}
`;

function Map() {
  const navigate = useNavigate();

  return (
    <div>
      <FlexRow>
        <Title as="h2">Order #24</Title>
        <NewDescText>Completed</NewDescText>

        <ActionButton
          flex="yes"
          br="var(--border-radius-sm)"
          bg="var(--oc-gray-9)"
          bd="var(--oc-gray-9)"
          pd="5px 15px"
          ml="auto"
          // disabled={is_creating_menu}
          onClick={() => navigate(-1)}
        >
          <IoArrowBack fontSize="2rem" strokeWidth={2} />
          <span>Back</span>
        </ActionButton>
      </FlexRow>
      <div
        style={{
          padding: "1.5rem 2rem",
          backgroundColor: "var(--oc-gray-8)",
          width: "500px",
          margin: "3rem auto",
          // borderRadius: "var(--border-radius-md)",
        }}
      >
        <FlexSpaceBetween>
          <DescriptionText color="var(--oc-white)" desc="bold">
            From Restaurant name
          </DescriptionText>
          <DescriptionText color="var(--oc-white)" desc="bold">
            Order Date (6 months ago)
          </DescriptionText>
        </FlexSpaceBetween>
      </div>
      <div
        style={{
          // padding: "3rem",
          width: "500px",
          margin: "0 auto",
        }}
      >
        <StyledBorder>
          <FlexSpaceBetween gap="0.5rem">
            <DescriptionText desc="true2">1 x Rice and Beans</DescriptionText>
            <DescriptionText desc="bold">#2,500</DescriptionText>
          </FlexSpaceBetween>
        </StyledBorder>

        <StyledBorder $flex="yes">
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <PiMoney /> */}
              <DescriptionText desc="bold">Sub Total</DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#2,500</DescriptionText>
          </FlexSpaceBetween>
          {/* <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              <MdDeliveryDining />
              <DescriptionText desc="bold">Delivery address</DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">
              Yunix Apt, Room 1002, Yongeli
            </DescriptionText>
          </FlexSpaceBetween> */}
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <MdDeliveryDining /> */}
              <DescriptionText desc="bold">Service Fee</DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#65</DescriptionText>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <PiMoney /> */}
              <DescriptionText desc="bold">Delivery fee</DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#150</DescriptionText>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <PiMoney /> */}
              <DescriptionText desc="bold">Total </DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#2,565</DescriptionText>
          </FlexSpaceBetween>
        </StyledBorder>
      </div>

      <div style={{ margin: "10px auto", maxWidth: "400px" }}>
        <TimeLine />
      </div>
    </div>
  );
}

export default Map;
