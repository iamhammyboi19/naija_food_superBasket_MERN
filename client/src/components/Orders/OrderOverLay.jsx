/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import ActionButton from "../../ui/ActionButton";
import DescriptionText from "../../ui/DescriptionText";
import FlexRow from "../../ui/FlexRow";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import Select from "../../ui/Select";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSecondsRemaining, tick } from "../../allRedux/countDownSlice";
import useOrder from "./useOrder";
import useAcceptOrder from "./useAcceptOrder";
import useRejectOrder from "./useRejectOrder";
import useUpdateOrder from "./useUpdateOrder";
import SpinnerContainer from "../../ui/SpinnerContainer";
import Spinner from "../../ui/Spinner";
// import { useForm } from "react-hook-form";

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
  }
`;

/*

const all_order_status = [
  "order_placed",
  "order_confirmed",
  "order_ready",
  "rider_pickup",
  "order_delivered",
  "order_cancelled",
];

*/

const order_status_aval_updates = [
  { name: "Order ready", value: "order_ready" },
  { name: "Rider pickup", value: "rider_pickup" },
  { name: "Order delivered", value: "order_delivered" },
  { name: "Cancel order", value: "order_cancelled" },
];

function MenuDescription({ menu_details }) {
  return (
    <>
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
              {menu_details.quantity}
            </ActionButton>
            <FlexRow cd="column" gap="0.5rem" fs="yes">
              <DescriptionText desc="bold">
                {menu_details.menu_name}
              </DescriptionText>
              <DescriptionText desc="semi-tiny">
                {menu_details.menu_desc}
              </DescriptionText>
            </FlexRow>
          </FlexRow>
          <FlexRow cd="column" gap="0.5rem" fs="yes">
            <DescriptionText desc="bold">{menu_details.price}</DescriptionText>
            <DescriptionText desc="fade-bold">
              {menu_details.total_price}
            </DescriptionText>
          </FlexRow>
        </FlexSpaceBetween>
      </StyledBorder>
    </>
  );
}

function OrderOverLay({ order }) {
  const { cur_order, isLoadingCurOrder } = useOrder(order._id);
  const { is_accepting_order, accept_order_api } = useAcceptOrder();
  const { is_rejecting_order, reject_order_api } = useRejectOrder();
  const { is_updating_order, update_order_api } = useUpdateOrder();

  // SELECT STATE
  const [selectStatus, setSelectStatus] = useState(
    cur_order?.current_order_status
  );

  // COUNT DOWN TIME
  const auto_cancel_at = moment(
    cur_order?.automatically_cancel_unaccepted_order_at
  );
  const order_date = moment(cur_order?.createdAt).fromNow();
  const current_time = moment(Date.now());
  const check_auto_cancel_at_isDate = isNaN(Date.now(auto_cancel_at._i));
  const time_remaining = check_auto_cancel_at_isDate
    ? 0
    : Math.trunc(auto_cancel_at.diff(current_time) / 1000);

  const dispatch = useDispatch();
  const { secondsRemaining, acceptedOrder } = useSelector(
    (state) => state.countDown
  );

  const isLoading =
    is_accepting_order || is_rejecting_order || is_updating_order;

  useEffect(
    function () {
      dispatch(addSecondsRemaining({ time_remaining }));

      const interval = setInterval(() => {
        dispatch(tick());
      }, 1000);

      return () => clearInterval(interval);
    },
    [time_remaining, dispatch]
  );

  const mins = Math.trunc(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  if (isLoadingCurOrder)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  // ACCEPT OR REJECT ORDER THROUGH ORDER DETAILS OVERLAY
  return (
    <div>
      <StyledOrderOverLay>
        <StyledBorder $pd="35px 20px 25px 20px">
          <FlexSpaceBetween>
            <DescriptionText desc="bold">#Order number</DescriptionText>
            <DescriptionText desc="tiny">{order_date || ""}</DescriptionText>
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
              {cur_order.status}
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
              {cur_order.paymentmethod}
            </ActionButton>
          </FlexRow>
        </StyledBorder>
        <div style={{ padding: "25px" }}>
          {order?.order_data?.menu_details?.map((menus) => (
            <MenuDescription key={menus._id} menu_details={menus} />
          ))}

          <StyledBorder $pd="12px 0px 40px 0px">
            <FlexSpaceBetween>
              <DescriptionText desc="tiny">Total order(credit)</DescriptionText>
              <DescriptionText desc="bold">{order.amount}</DescriptionText>
            </FlexSpaceBetween>
          </StyledBorder>

          {cur_order.stage > 1 &&
            !cur_order.cancelled &&
            cur_order.status !== "completed" &&
            cur_order.status !== "cancelled" && (
              <FlexSpaceBetween mt="2.5rem">
                <Select
                  disabled={isLoading}
                  onChange={(e) => {
                    setSelectStatus(e.target.value);
                  }}
                >
                  {order_status_aval_updates.map((stat) => (
                    <option key={stat.value} value={stat.value}>
                      {stat.name}
                    </option>
                  ))}
                </Select>
                <ActionButton
                  bg="var(--oc-green-7)"
                  bd="var(--oc-green-7)"
                  br="var(--border-radius-xlg)"
                  disabled={isLoading}
                  onClick={() => {
                    update_order_api({
                      order_id: order._id,
                      data: { order_status: selectStatus },
                    });
                  }}
                >
                  Update
                </ActionButton>
              </FlexSpaceBetween>
            )}

          <FlexSpaceBetween mt="2.5rem">
            <DescriptionText desc="true">
              {/* MEANING AUTOMATICALLY CANCELLED */}
              {cur_order.automatically_cancelled && cur_order.reason_for_cancel}

              {/* MEANING NOT YET CANCELLED AUTOMATICALLY */}
              {secondsRemaining > 0 &&
                secondsRemaining !== null &&
                acceptedOrder === "waiting" &&
                `Will be rejected automatically in (${String(mins).padStart(
                  2,
                  "0"
                )}:${String(secs).padStart(2, "0")})`}
            </DescriptionText>
            <FlexRow gap="0.5rem">
              {secondsRemaining > 0 &&
                secondsRemaining !== null &&
                acceptedOrder === "waiting" && (
                  <>
                    {" "}
                    <ActionButton
                      bd="var(--oc-gray-3)"
                      bg="var(--oc-gray-1)"
                      br="var(--border-radius-xlg)"
                      fg="var(--oc-gray-7)"
                      pd="0.5rem 2rem"
                      fs="1.4rem"
                      disabled={isLoading}
                      onClick={() => reject_order_api({ order_id: order._id })}
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
                      disabled={isLoading}
                      onClick={() => accept_order_api({ order_id: order._id })}
                    >
                      Accept
                    </ActionButton>
                  </>
                )}
            </FlexRow>
          </FlexSpaceBetween>
        </div>
      </StyledOrderOverLay>
    </div>
  );
}

export default OrderOverLay;
