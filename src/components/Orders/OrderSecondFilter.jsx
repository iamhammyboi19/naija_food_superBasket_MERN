import styled from "styled-components";
import InputContainer from "../../ui/InputSearchContainer";
import InputSearch from "../../ui/InputSearch";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";

const OrderFilterParent = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  padding: 1rem;
  background-color: var(--oc-white);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: var(--border-radius-sm);
`;

function OrderSecondFilter() {
  const [searchTitle, setSearchTitle] = useState("");
  return (
    <OrderFilterParent>
      <InputContainer $w="40%" $bg="var(--oc-gray-1)">
        <HiMiniMagnifyingGlass
          style={{ color: "var(--oc-gray-8)", fontSize: "20px" }}
        />
        <InputSearch
          placeholder="Search order #, name, or email"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          $bg="var(--oc-gray-1)"
        />
      </InputContainer>
    </OrderFilterParent>
  );
}

export default OrderSecondFilter;
