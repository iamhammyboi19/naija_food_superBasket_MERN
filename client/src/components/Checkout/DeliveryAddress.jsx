import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import FlexRow from "../../ui/FlexRow";
import Title from "../../ui/Title";
import { HiHome } from "react-icons/hi2";
import ActionButton from "../../ui/ActionButton";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import Modal from "../../ui/Modal";
import DisplayMap from "../GoogleMapAddLocation/DisplayMap";

const StyledAddress = styled.div`
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0.5px 2px;
  padding: 3rem 2rem;
  /* max-width: 50rem; */
  width: 100%;
  border-radius: var(--border-radius-lg);
  margin-bottom: 3rem;
`;

function DeliveryAddress() {
  return (
    <StyledAddress>
      <FlexSpaceBetween>
        <Title as="h3">Delivery Address</Title>
        <Modal>
          <Modal.Open opens="checkoutmap">
            <ActionButton
              fg="var(--oc-red-8)"
              bg="var(--oc-white)"
              bd="var(--oc-white)"
              pr="0rem"
            >
              Change
            </ActionButton>
          </Modal.Open>
          <Modal.Window name="checkoutmap">
            <DisplayMap />
          </Modal.Window>
        </Modal>
      </FlexSpaceBetween>
      <FlexRow fs="yes" gap="0.5rem">
        <div style={{ paddingTop: "0.3rem" }}>
          <HiHome />
        </div>
        <div>
          <DescriptionText desc="semi-bold">House</DescriptionText>
          <DescriptionText desc="true">
            This should container the user delivery full address
          </DescriptionText>
          <DescriptionText desc="true">
            Note to rider: Say something to the rider if you need to
          </DescriptionText>
        </div>
      </FlexRow>
    </StyledAddress>
  );
}

export default DeliveryAddress;
