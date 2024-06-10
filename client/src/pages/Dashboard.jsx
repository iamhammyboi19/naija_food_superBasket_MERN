/* eslint-disable react/prop-types */
import Title from "../ui/Title";
import GridTemplate from "../ui/GridTemplate";
// GridTemplate
import DashboardCards from "../components/DashBoards/DashboardCards";
import { HiBanknotes } from "react-icons/hi2";
import { MdPedalBike } from "react-icons/md";
import { PiPersonSimpleBike } from "react-icons/pi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useUser from "../components/Auths/useUser";

function Dashboard() {
  const { user } = useUser();
  useDocumentTitle("Dashboard | Naija Food superBasket");
  return (
    <>
      <Title as="h2">Welcome back, {user.name.split(" ").at(0)}</Title>
      <GridTemplate cols={3} colsgap="2.5rem">
        <DashboardCards
          title="Total Fees Paid"
          desc="100,000,900#"
          icon={
            <HiBanknotes
              style={{ color: "var(--oc-green-9)" }}
              fontSize="20px"
            />
          }
          bg={"var(--oc-green-1)"}
        />
        <DashboardCards
          title="Completed Orders"
          desc="2"
          icon={<MdPedalBike fontSize={"20px"} color="var(--oc-indigo-9)" />}
          bg={"var(--oc-indigo-1)"}
        />
        <DashboardCards
          title="Active Orders"
          desc="0"
          icon={
            <PiPersonSimpleBike fontSize={"20px"} color="var(--oc-yellow-9)" />
          }
          bg={"var(--oc-yellow-1)"}
        />
      </GridTemplate>
    </>
  );
}

export default Dashboard;
