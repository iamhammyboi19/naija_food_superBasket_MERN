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

const stage = 5;

/*
[stages-1-5]
order placed
order confirmed
order ready
rider pickup
order delivered
order canceled
*/

function TimeLine() {
  return (
    <StyledTimeLine>
      <TimeLineItem
        content="Order placed"
        state={(stage > 1).toString()}
        current={stage === 1}
        contentDesc={
          stage >= 1 && "Order placed waiting for restaurant to confirm order"
        }
        // time={null}
      />
      <TimeLineItem
        content="Preparing your order"
        // state={stage > 2}
        state={(stage > 2).toString()}
        current={stage === 2}
        contentDesc={
          stage >= 2 && "Restaurant is currently preparing your order"
        }
      />
      <TimeLineItem
        content="Order ready"
        // state={stage > 3}
        state={(stage > 3).toString()}
        current={stage === 3}
        contentDesc={stage >= 3 && "Order ready for pickup"}
      />
      <TimeLineItem
        content="Rider pickup"
        // state={stage > 4}
        state={(stage > 4).toString()}
        current={stage === 4}
        contentDesc={stage >= 4 && "Your order is picked up and on the way"}
      />
      <TimeLineItem
        content="Order delivered"
        // state={stage > 5}
        state={(stage > 5).toString()}
        current={stage === 5}
        contentDesc={stage >= 5 && "Your order is picked up and on the way"}
      />
    </StyledTimeLine>
  );
}

export default TimeLine;
