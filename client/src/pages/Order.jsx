import OrderFirstFilter from "../components/Orders/OrderFirstFilter";
import OrderList from "../components/Orders/OrderList";
import OrderSecondFilter from "../components/Orders/OrderSecondFilter";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Order() {
  useDocumentTitle("Orders | Naija Food superBasket");
  return (
    <div>
      <OrderFirstFilter />
      <OrderSecondFilter />
      <OrderList />
    </div>
  );
}

export default Order;
