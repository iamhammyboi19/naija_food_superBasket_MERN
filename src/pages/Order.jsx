import OrderFirstFilter from "../components/Orders/OrderFirstFilter";
import OrderList from "../components/Orders/OrderList";
import OrderSecondFilter from "../components/Orders/OrderSecondFilter";

function Order() {
  return (
    <div>
      <OrderFirstFilter />
      <OrderSecondFilter />
      <OrderList />
    </div>
  );
}

export default Order;
