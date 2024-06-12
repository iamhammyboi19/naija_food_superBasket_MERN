import styled from "styled-components";
// import InputContainer from "../../ui/InputSearchContainer";
// import InputSearch from "../../ui/InputSearch";
// import { HiMiniMagnifyingGlass } from "react-icons/hi2";
// import { useState } from "react";
import MainFilter from "../Filters/MainFilter";

const OrderFilterParent = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: var(--oc-white);
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
  border-radius: var(--border-radius-sm);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

// FILTER BY DATE || AMOUNT || PAYMENT METHOD
// USE ONE COMPONENT with map function
const filters = [
  {
    filterName: "Date",
    showInput: true,
    filterDetails: [{ value: "Last", name: "in the last" }],
    aside: true,
    asideOptions: [
      { value: "days", name: "days" },
      { value: "weeks", name: "weeks" },
      { value: "hours", name: "hours" },
    ],
  },
  {
    filterName: "Amount",
    showInput: true,
    filterDetails: [
      { value: "Exactly", name: "is equal to" },
      { value: "More than", name: "is greater than" },
      { value: "Less than", name: "is less than" },
    ],
    aside: false,
    asideOptions: [],
  },
  {
    filterName: "Payment method",
    showInput: false,
    filterDetails: [
      { value: "Card", name: "card" },
      { value: "Cash", name: "cash" },
      { value: "Online payment", name: "online" },
    ],
    aside: false,
    asideOptions: [],
  },
];

function OrderSecondFilter() {
  // const [searchTitle, setSearchTitle] = useState("");
  return (
    <OrderFilterParent>
      {/* <InputContainer $w="40%" $bg="var(--oc-gray-1)">
        <HiMiniMagnifyingGlass
          style={{ color: "var(--oc-gray-8)", fontSize: "20px" }}
        />
        <InputSearch
          placeholder="Search order #, name, or email"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          $bg="var(--oc-gray-1)"
        />
      </InputContainer> */}
      {/* // FILTER BY DATE || AMOUNT || PAYMENT METHOD */}
      {filters.map((el) => (
        <MainFilter
          key={el.filterName}
          filterDetails={el.filterDetails}
          filterName={el.filterName}
          showInput={el.showInput}
          aside={el.aside}
          asideOptions={el.asideOptions}
        />
      ))}
    </OrderFilterParent>
  );
}

export default OrderSecondFilter;
