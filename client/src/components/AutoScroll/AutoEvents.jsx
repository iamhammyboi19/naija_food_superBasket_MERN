/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import { IoTicket } from "react-icons/io5";

const StyledAutoEvents = styled.div`
  padding: 4rem 0;
  overflow: hidden;
  display: flex;
  gap: 3rem;
  position: relative;
  user-select: none;
  margin-top: 3rem;

  &:hover {
    .eventsss {
      animation-play-state: paused;
    }
  }

  &::before {
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 200px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
    position: absolute;
    z-index: 1;
  }

  &::after {
    content: "";
    top: 0;
    right: 0;
    height: 100%;
    width: 200px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
    position: absolute;
    z-index: 1;
  }

  @media (max-width: 53.75em) {
    &::after,
    &::before {
      width: 120px;
    }
  }
`;

const ScrollX = keyframes`
    to{
        transform: translateX(calc(-100% - 3rem));
    }
`;

const EventsTicketCon = styled.div`
  display: flex;
  gap: 3rem;
`;

const EventsCon = styled.div`
  display: flex;
  gap: 3rem;
  flex-shrink: 0;
  animation: ${ScrollX} 30s linear infinite;
`;

function EventIcons({ name }) {
  return (
    <EventsTicketCon>
      <IoTicket fontSize={"3rem"} />
      <DescriptionText desc="fade-bold">{name}</DescriptionText>
    </EventsTicketCon>
  );
}

function EventsSamples() {
  return (
    <EventsCon className="eventsss">
      <EventIcons name="Live updates on orders" />
      <EventIcons name="Highly rated riders" />
      <EventIcons name="20/7 support for customers and vendors" />
      <EventIcons name="Quality meal choices" />
      <EventIcons name="Quick and easy onboarding" />
      <EventIcons name="Easy order tracking" />
      <EventIcons name="Ratings and Reviews" />
    </EventsCon>
  );
}

function AutoEvents() {
  return (
    <StyledAutoEvents>
      <EventsSamples />
      <EventsSamples />
    </StyledAutoEvents>
  );
}

export default AutoEvents;
// import { BsFillSuitDiamondFill } from "react-icons/bs";
// import { BsTicketFill } from "react-icons/bs";
// import { IoTicket } from "react-icons/io5";
