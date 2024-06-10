import styled from "styled-components";
import Title from "../../ui/Title";
import CartCheckout from "./CartCheckout";
import CartItems from "./CartItems";
import useUser from "../Auths/useUser";
import Empty from "../../ui/Empty";
import { useNavigate } from "react-router-dom";
// import EmptyCarts from "./EmptyCarts";

const GridCon = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1.2fr;
  column-gap: 4rem;
  margin-top: 2rem;

  @media (max-width: 75em) {
    grid-template-columns: 1fr;
  }
`;

function Carts() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <Title as="h2">Menu Cart</Title>
      <Title as="h6">
        {user?.carts?.length === undefined || user?.carts?.length < 1
          ? "0"
          : user?.carts?.length}{" "}
        products in Cart
      </Title>
      {user?.carts?.length === undefined || user?.carts?.length < 1 ? (
        <Empty
          imgurl="/addToCart.png"
          actMsg="Explore restaurants"
          message=" Your cart is empty. Keep checking restaurants to add a menu!"
          onClick={() => navigate("/restaurants")}
        />
      ) : (
        <GridCon>
          <div>
            {user.carts.map((cart) => (
              <CartItems key={cart._id} cart={cart} />
            ))}
          </div>
          <div>
            <CartCheckout showbtn={true} carts={user.carts} />
          </div>
        </GridCon>
      )}
    </div>
  );
}

export default Carts;
