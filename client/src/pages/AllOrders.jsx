/* eslint-disable react/prop-types */
import styled from "styled-components";
import ActionButton from "../ui/ActionButton";
import DescriptionText from "../ui/DescriptionText";
import FlexRow from "../ui/FlexRow";
import FlexSpaceBetween from "../ui/FlexSpaceBetween";
import Modal from "../ui/Modal";
import OrderOverLay from "../components/Orders/OrderOverLay";
import { GrView } from "react-icons/gr";

const StyledOrderBack = styled.div`
  /* width: max-content; */
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  margin-bottom: 2rem;
`;

function AllOrders({ order }) {
  return (
    <StyledOrderBack>
      <FlexRow>
        <DescriptionText desc="bold">#Order number</DescriptionText>
        <DescriptionText desc="tiny">minutes ago</DescriptionText>
      </FlexRow>
      <FlexSpaceBetween mt="25px">
        <FlexRow gap="0.7rem">
          <ActionButton
            bd="var(--oc-gray-3)"
            bg="var(--oc-gray-3)"
            br="var(--border-radius-xlg)"
            fg="var(--oc-gray-7)"
            pd="0.5rem 1.3rem"
            fs="1rem"
            fontW={500}
          >
            {order.order_data.items_number} item(s)
          </ActionButton>
          <ActionButton
            bd="var(--oc-gray-3)"
            bg="var(--oc-gray-3)"
            br="var(--border-radius-xlg)"
            fg="var(--oc-gray-7)"
            pd="0.5rem 1.3rem"
            fs="1rem"
            fontW={500}
          >
            Card
          </ActionButton>
          <ActionButton
            bd="var(--oc-gray-3)"
            bg="var(--oc-gray-3)"
            br="var(--border-radius-xlg)"
            fg="var(--oc-gray-7)"
            pd="0.5rem 1.3rem"
            fs="1rem"
            fontW={500}
          >
            {order.status}
          </ActionButton>
          <ActionButton
            bd="var(--oc-gray-3)"
            bg="var(--oc-gray-3)"
            br="var(--border-radius-xlg)"
            fg="var(--oc-gray-7)"
            pd="0.5rem 1.3rem"
            fs="1rem"
            fontW={500}
          >
            #{order.amount}
          </ActionButton>
        </FlexRow>
        <FlexRow gap="0.5rem">
          <Modal>
            <Modal.Open opens="order">
              <ActionButton
                bd="var(--oc-yellow-3)"
                bg="var(--oc-yellow-3)"
                br="var(--border-radius-xlg)"
                fg="var(--oc-gray-7)"
                pd="0.5rem 1.3rem"
                fs="1.2rem"
              >
                Details
              </ActionButton>
            </Modal.Open>
            <Modal.Window mw="yes" pd="2rem 0" name="order">
              <OrderOverLay order={order} />
            </Modal.Window>
          </Modal>
          <ActionButton
            bd="var(--oc-yellow-3)"
            bg="var(--oc-yellow-3)"
            br="var(--border-radius-xlg)"
            fg="var(--oc-gray-7)"
            pd="0.5rem 1.3rem"
            flex="yes"
            // fs="1.2rem"
          >
            <GrView />
          </ActionButton>
        </FlexRow>
      </FlexSpaceBetween>
    </StyledOrderBack>
  );
}

export default AllOrders;
