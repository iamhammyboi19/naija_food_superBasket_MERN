import styled, { css } from "styled-components";
import Title from "../ui/Title";
import ActionButton from "../ui/ActionButton";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import FlexRow from "../ui/FlexRow";
import FlexSpaceBetween from "../ui/FlexSpaceBetween";
import DescriptionText from "../ui/DescriptionText";
import TimeLine from "../components/TimeLine/TimeLine";
import useOrder from "../components/Orders/useOrder";
import SpinnerContainer from "../ui/SpinnerContainer";
import Spinner from "../ui/Spinner";
import moment from "moment";
// import TimeLine from "../components/TimeLine/TimeLine";

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

function OrderDetails() {
  const navigate = useNavigate();
  const { order_id } = useParams();
  const { cur_order, isLoadingCurOrder } = useOrder(order_id);
  const restaurant_name =
    cur_order?.order_data?.menu_details?.at(0)?.restaurant_name;
  const menu_details = cur_order?.order_data?.menu_details;

  const order_date = moment(cur_order?.createdAt).fromNow();

  if (isLoadingCurOrder)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  return (
    <div>
      <FlexRow>
        <Title as="h2">Order #</Title>
        <NewDescText>{cur_order.status}</NewDescText>

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
          maxWidth: "500px",
          margin: "3rem auto",
          // borderRadius: "var(--border-radius-md)",
        }}
      >
        <FlexSpaceBetween>
          <DescriptionText color="var(--oc-white)" desc="bold">
            From {restaurant_name || "Restaurant"}
          </DescriptionText>
          <DescriptionText color="var(--oc-white)" desc="bold">
            Order Date ({order_date})
          </DescriptionText>
        </FlexSpaceBetween>
      </div>
      <div
        style={{
          // padding: "3rem",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {menu_details?.map((menu) => (
          <StyledBorder key={menu._id}>
            <FlexSpaceBetween gap="0.5rem">
              <DescriptionText desc="true2">
                {menu.quantity} x {menu.menu_name}
              </DescriptionText>
              <DescriptionText desc="bold">#{menu.total_price}</DescriptionText>
            </FlexSpaceBetween>
          </StyledBorder>
        ))}

        <StyledBorder $flex="yes">
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <PiMoney /> */}
              <DescriptionText desc="bold">Sub Total</DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#{cur_order.amount}</DescriptionText>
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
            <DescriptionText desc="true">#0</DescriptionText>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <PiMoney /> */}
              <DescriptionText desc="bold">Delivery fee</DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#0</DescriptionText>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <FlexRow gap="0.5rem">
              {/* <PiMoney /> */}
              <DescriptionText desc="bold">Total </DescriptionText>
            </FlexRow>
            <DescriptionText desc="true">#{cur_order.amount}</DescriptionText>
          </FlexSpaceBetween>
        </StyledBorder>
      </div>

      <div style={{ margin: "10px auto", maxWidth: "400px" }}>
        <TimeLine order={cur_order} />
      </div>
    </div>
  );
}

export default OrderDetails;
