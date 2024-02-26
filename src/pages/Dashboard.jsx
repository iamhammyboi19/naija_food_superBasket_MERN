/* eslint-disable react/prop-types */
import Title from "../ui/Title";
import GridTemplate from "../ui/GridTemplate";
// GridTemplate
import DashboardCards from "../components/DashBoards/DashboardCards";

function Dashboard() {
  return (
    <>
      <Title as="h2">Welcome back, Username</Title>
      <GridTemplate cols={4} colsgap="2.5rem">
        <DashboardCards title="Total Fees Paid" desc="100,000,900#" />
        <DashboardCards title="Completed Orders" desc="2" />
        <DashboardCards title="Active Orders" desc="0" />
      </GridTemplate>
    </>
  );
}

export default Dashboard;
