import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledOrderFirstFilter = styled.div`
  display: inline-block;
  background-color: var(--oc-gray-1);
  padding: 1px;
  border-radius: var(--border-radius-xlg);
  max-width: 30rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const OrderFilterParent = styled.div`
  margin: 15px auto 15px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: var(--oc-white);
  border-radius: var(--border-radius-sm);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "allorders";
  function handleActive(e) {
    setActiveBtn(e.target.id);
    searchParams.set("status", this[0]);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <OrderFilterParent>
        <StyledOrderFirstFilter>
          <Button
            key="1"
            id="1"
            className={activeBtn === "1" ? "activebtn" : ""}
            onClick={(e) => {
              handleActive.bind(["allorders"])(e);
            }}
            disabled={currentStatus === "allorders"}
          >
            All Orders
          </Button>
          <Button
            key="2"
            id="2"
            className={activeBtn === "2" ? "activebtn" : ""}
            onClick={(e) => {
              handleActive.bind(["completed"])(e);
            }}
            disabled={currentStatus === "completed"}
          >
            Completed
          </Button>
          <Button
            key="3"
            id="3"
            className={activeBtn === "3" ? "activebtn" : ""}
            onClick={(e) => {
              handleActive.bind(["canceled"])(e);
            }}
            disabled={currentStatus === "canceled"}
          >
            Canceled
          </Button>
        </StyledOrderFirstFilter>
      </OrderFilterParent>
    </div>
  );
}

export default OrderFirstFilter;
