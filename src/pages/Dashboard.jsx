/* eslint-disable react/prop-types */

import styled from "styled-components";
import Title from "../ui/Title";
import GridTemplate from "../ui/GridTemplate";
// GridTemplate
import DashboardCards from "../components/DashboardCards";

const StyledDashboard = styled.div`
  padding: 2rem 3rem;
  max-width: 100%;
  margin-left: 320px;
  z-index: -99;
  overflow: scroll;

  @media (max-width: 53.4375em) {
    margin-left: 0;
  }
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <Title as="h2">Welcome back, Username</Title>
      <GridTemplate cols={4} colsgap="2.5rem">
        <DashboardCards title="Total Fees Paid" desc="10,900#" />
        <DashboardCards title="Completed Orders" desc="2" />
        <DashboardCards title="Active Orders" desc="0" />
      </GridTemplate>
    </StyledDashboard>
  );
}

export default Dashboard;
