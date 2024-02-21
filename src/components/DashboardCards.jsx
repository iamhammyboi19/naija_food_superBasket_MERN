/* eslint-disable react/prop-types */
import styled from "styled-components";
import DescriptionText from "../ui/DescriptionText";
import Title from "../ui/Title";

const StyledDashboardCards = styled.div`
  padding: 2rem;
  width: 100%;
  border-radius: var(--border-radius-md);
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

function DashboardCards({ title, desc }) {
  return (
    <StyledDashboardCards>
      <DescriptionText desc="bold">{title}</DescriptionText>
      <Title as="h4">{desc}</Title>
    </StyledDashboardCards>
  );
}

export default DashboardCards;
