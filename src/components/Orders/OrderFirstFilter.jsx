import { useState } from "react";
import styled from "styled-components";

const StyledOrderFirstFilter = styled.div`
  display: inline-block;
  background-color: var(--oc-gray-1);
  padding: 1px;
  border-radius: var(--border-radius-xlg);
  max-width: 30rem;
`;

const OrderFilterParent = styled.div`
  margin: 15px auto 15px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: var(--border-radius-sm);
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: var(--border-radius-xlg);
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--oc-gray-6);
  transition: all ease-out 0.3s;

  &.activebtn {
    color: var(--oc-gray-9);
    background-color: var(--oc-white);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 0.5px 1px 0px,
      rgba(60, 64, 67, 0.15) 0px 0.5px 1.5px 0.5px;
  }
`;

function OrderFirstFilter() {
  const [activeBtn, setActiveBtn] = useState("1");
  function handleActive(e) {
    setActiveBtn(e.target.id);
  }
  return (
    <div>
      <OrderFilterParent>
        <StyledOrderFirstFilter>
          <Button
            key="1"
            id="1"
            className={activeBtn === "1" ? "activebtn" : ""}
            onClick={handleActive}
          >
            All Orders
          </Button>
          <Button
            key="2"
            id="2"
            className={activeBtn === "2" ? "activebtn" : ""}
            onClick={handleActive}
          >
            Completed
          </Button>
          <Button
            key="3"
            id="3"
            className={activeBtn === "3" ? "activebtn" : ""}
            onClick={handleActive}
          >
            Canceled
          </Button>
        </StyledOrderFirstFilter>
      </OrderFilterParent>
    </div>
  );
}

export default OrderFirstFilter;
