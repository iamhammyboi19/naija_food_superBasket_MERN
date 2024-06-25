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
import useOrders from "../components/Orders/useOrders";
import SpinnerContainer from "../ui/SpinnerContainer";
import Spinner from "../ui/Spinner";

function Dashboard() {
  const { user } = useUser();
  const { all_orders, isLoadingOrders } = useOrders();
  const amount = all_orders
    ?.map((item) => item.amount)
    ?.reduce((acc, cur_val) => acc + cur_val, 0);

  const completed_orders = all_orders?.filter(
    (order) => order.status.toLowerCase() === "completed"
  )?.length;

  const active_orders = all_orders?.filter(
    (order) => order.status.toLowerCase() === "ongoingorders"
  )?.length;

  useDocumentTitle("Dashboard | Naija Food superBasket");

  if (isLoadingOrders)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  return (
    <>
      <Title as="h2">Welcome back, {user.name.split(" ").at(0)}</Title>
      <GridTemplate cols={3} colsgap="2.5rem">
        <DashboardCards
          title="Total Fees Paid"
          desc={`${amount || 0}#`}
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
          desc={`${completed_orders}`}
          icon={<MdPedalBike fontSize={"20px"} color="var(--oc-indigo-9)" />}
          bg={"var(--oc-indigo-1)"}
        />
        <DashboardCards
          title="Active Orders"
          desc={`${active_orders}`}
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
