/* eslint-disable react/prop-types */
import styled from "styled-components";
import TimeLineItem from "./TimeLineItem";

const StyledTimeLine = styled.div`
  position: relative;
  margin: 50px auto;
  max-width: 500px;

  .timelineitem {
    &:last-child {
      &::before {
        height: 0%;
      }
    }
  }
`;

/*
[stages-1-5]
order placed
order confirmed
order ready
rider pickup
order delivered
order canceled -> stage 0
*/

function TimeLine({ order }) {
  const stage = order.stage;
  const if_cancelled_cancelled_stage = order.cancelled && order.cancelled_stage;
  return (
    <StyledTimeLine>
      <TimeLineItem
        content="Order placed"
        state={(stage > 1 || if_cancelled_cancelled_stage > 1).toString()}
        current={stage === 1}
        cancelled_at={(
          stage === 0 && if_cancelled_cancelled_stage === 1
        ).toString()}
        contentDesc={
          stage >= 1 && "Order placed waiting for restaurant to confirm order"
        }
        cancelled_desc={
          stage === 0 &&
          if_cancelled_cancelled_stage === 1 &&
          order.reason_for_cancel
        }
        // time={null}
      />
      <TimeLineItem
        content="Preparing your order"
        // state={stage > 2}
        state={(stage > 2 || if_cancelled_cancelled_stage > 2).toString()}
        current={stage === 2}
        cancelled_at={(
          stage === 0 && if_cancelled_cancelled_stage === 2
        ).toString()}
        contentDesc={
          stage >= 2 && "Restaurant is currently preparing your order"
        }
        cancelled_desc={
          stage === 0 &&
          if_cancelled_cancelled_stage === 2 &&
          order.reason_for_cancel
        }
      />
      <TimeLineItem
        content="Order ready"
        // state={stage > 3}
        state={(stage > 3 || if_cancelled_cancelled_stage > 3).toString()}
        current={stage === 3}
        cancelled_at={(
          stage === 0 && if_cancelled_cancelled_stage === 3
        ).toString()}
        cancelled_desc={
          stage === 0 &&
          if_cancelled_cancelled_stage === 3 &&
          order.reason_for_cancel
        }
        contentDesc={stage >= 3 && "Order ready for pickup"}
      />
      <TimeLineItem
        content="Rider pickup"
        // state={stage > 4}
        state={(stage > 4 || if_cancelled_cancelled_stage > 4).toString()}
        current={stage === 4}
        cancelled_at={(
          stage === 0 && if_cancelled_cancelled_stage === 4
        ).toString()}
        cancelled_desc={
          stage === 0 &&
          if_cancelled_cancelled_stage === 4 &&
          order.reason_for_cancel
        }
        contentDesc={stage >= 4 && "Your order is picked up and on the way"}
      />
      <TimeLineItem
        content="Order delivered"
        // state={stage > 5}
        state={(stage === 5).toString()}
        current={false}
        cancelled_at={(
          stage === 0 && if_cancelled_cancelled_stage === 5
        ).toString()}
        cancelled_desc={
          stage === 0 &&
          if_cancelled_cancelled_stage === 5 &&
          order.reason_for_cancel
        }
        contentDesc={stage >= 5 && "Your order is picked up and on the way"}
      />
    </StyledTimeLine>
  );
}

export default TimeLine;
