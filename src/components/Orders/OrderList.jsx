import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import FlexRow from "../../ui/FlexRow";

const StyledOrderGrid = styled.div`
  margin: 15px auto 15px auto;
  background-color: var(--oc-white);
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
  border-radius: var(--border-radius-sm);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  overflow: hidden;
`;

const StyledGrid = styled.div`
  border-bottom: 0.4px solid var(--oc-gray-4);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 2rem;

  /* 31.25 */

  @media (max-width: 31.25em) {
    padding: 1rem;
  }

  &:last-child {
    border-bottom: 0px solid var(--oc-gray-1);
  }
`;

const StyledGridHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-bottom: 0.4px solid var(--oc-gray-4);
  padding: 1.5rem 2rem;
  background-color: var(--oc-gray-05);

  @media (max-width: 31.25em) {
    padding: 1rem;
  }
`;

const NewDescText = styled.span`
  font-size: 1.1rem;
  background-color: var(--oc-green-1);
  padding: 4px 12px;
  text-align: center;
  border-radius: var(--border-radius-lg);
  color: var(--oc-green-9);
  font-weight: 500;
  width: fit-content;

  @media (max-width: 31.25em) {
    font-size: 0.8rem;
    padding: 2px 6px;
  }
`;

const StyledListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: var(--oc-gray-05);

  @media (max-width: 31.25em) {
    padding: 1rem;
  }
`;

const NewActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: var(--border-radius-sm);
  border: none;
  background-color: transparent;
  transition: all ease 0.3s;
  color: var(--oc-gray-8);
  font-weight: 500;

  & span {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--oc-indigo-8);
    color: var(--oc-white);
  }

  @media (max-width: 31.25em) {
    & span {
      font-size: 1rem;
    }
    padding: 2px 4px;
    gap: 1px;
    border-radius: 2.5px;
  }
`;

function OrderListBottom() {
  return (
    <StyledListBottom>
      <div>
        <DescriptionText desc="true">
          Showing <strong>1</strong> to <strong>10</strong> of{" "}
          <strong>24</strong> results
        </DescriptionText>
      </div>
      <FlexRow gap="1rem">
        <NewActionButton>
          <HiChevronLeft fontSize={"1.4rem"} /> <span>Previous</span>
        </NewActionButton>
        <NewActionButton>
          <span>Next</span>
          <HiChevronRight fontSize={"1.4rem"} />{" "}
        </NewActionButton>
      </FlexRow>
    </StyledListBottom>
  );
}

function OrderListItems() {
  return (
    <StyledGrid>
      <DescriptionText desc="fade-bold">Moi Moi</DescriptionText>
      <DescriptionText desc="fade-bold">Mar 3, 2024</DescriptionText>
      <DescriptionText desc="fade-bold">
        {"Iya Ahmed Food".split(" ").slice(0, 2).join(" ")}
      </DescriptionText>
      <DescriptionText desc="fade-bold">Card</DescriptionText>
      <NewDescText>Completed</NewDescText>
      <DescriptionText desc="fade-bold">#10,000</DescriptionText>
    </StyledGrid>
  );
}

function OrderListHeader() {
  return (
    <StyledGridHeader>
      <DescriptionText desc="bold">Order</DescriptionText>
      <DescriptionText desc="bold">Date</DescriptionText>
      <DescriptionText desc="bold">Restaurant</DescriptionText>
      <DescriptionText desc="bold">Payment</DescriptionText>
      <DescriptionText desc="bold">Status</DescriptionText>
      <DescriptionText desc="bold">Price</DescriptionText>
    </StyledGridHeader>
  );
}

function OrderList() {
  return (
    <StyledOrderGrid>
      <OrderListHeader />
      <OrderListItems />
      <OrderListItems />
      <OrderListItems />
      <OrderListItems />
      <OrderListItems />
      <OrderListItems />
      <OrderListBottom />
    </StyledOrderGrid>
  );
}

export default OrderList;
