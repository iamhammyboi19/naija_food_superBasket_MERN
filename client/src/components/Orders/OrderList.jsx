// import styled from "styled-components";
// import Urder from "../../pages/Urder";
import { useNavigate } from "react-router-dom";
import { FaReceipt } from "react-icons/fa6";
import DescriptionText from "../../ui/DescriptionText";
import ActionButton from "../../ui/ActionButton";

//
// import DescriptionText from "../../ui/DescriptionText";
// import {
//   HiChevronLeft,
//   HiChevronRight,
//   HiEllipsisVertical,
// } from "react-icons/hi2";
// import FlexRow from "../../ui/FlexRow";
// import NewActionButton from "../../ui/NewActionButton";

// const StyledOrderGrid = styled.div`
//   margin: 15px auto 15px auto;
//   background-color: var(--oc-white);
//   /* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
//   border-radius: var(--border-radius-sm);
//   box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
//     rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
//   overflow: hidden;
// `;

// const StyledGrid = styled.div`
//   border-bottom: 0.4px solid var(--oc-gray-4);
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   padding: 1.5rem 2rem;

//   /* 31.25 */

//   @media (max-width: 31.25em) {
//     padding: 1rem;
//   }

//   &:last-child {
//     border-bottom: 0px solid var(--oc-gray-1);
//   }
// `;

// const StyledGridHeader = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   border-bottom: 0.4px solid var(--oc-gray-4);
//   padding: 1rem 2rem;
//   background-color: var(--oc-gray-05);

//   @media (max-width: 31.25em) {
//     padding: 1rem;
//   }
// `;

// const NewDescText = styled.span`
//   font-size: 1.1rem;
//   background-color: var(--oc-green-1);
//   padding: 4px 12px;
//   text-align: center;
//   border-radius: var(--border-radius-lg);
//   color: var(--oc-green-9);
//   font-weight: 500;
//   width: fit-content;

//   @media (max-width: 31.25em) {
//     font-size: 0.8rem;
//     padding: 2px 6px;
//   }
// `;

// const StyledListBottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 1.5rem 2rem;
//   background-color: var(--oc-gray-05);

//   @media (max-width: 31.25em) {
//     padding: 1rem;
//   }
// `;

// function OrderListBottom() {
//   return (
//     <StyledListBottom>
//       <div>
//         <DescriptionText desc="true">
//           Showing <strong>1</strong> to <strong>10</strong> of{" "}
//           <strong>24</strong> results
//         </DescriptionText>
//       </div>
//       <FlexRow gap="1rem">
//         <NewActionButton>
//           <HiChevronLeft fontSize={"1.4rem"} /> <span>Previous</span>
//         </NewActionButton>
//         <NewActionButton>
//           <span>Next</span>
//           <HiChevronRight fontSize={"1.4rem"} />{" "}
//         </NewActionButton>
//       </FlexRow>
//     </StyledListBottom>
//   );
// }

// function OrderListItems() {
//   return (
//     <StyledGrid>
//       <DescriptionText desc="fade-bold">Moi Moi</DescriptionText>
//       <DescriptionText desc="fade-bold">Mar 3, 2024</DescriptionText>
//       <DescriptionText desc="fade-bold">
//         {"Iya Ahmed Food".split(" ").slice(0, 2).join(" ")}
//       </DescriptionText>
//       <DescriptionText desc="fade-bold">Card</DescriptionText>
//       <NewDescText>Completed</NewDescText>
//       <FlexRow>
//         <DescriptionText desc="fade-bold">#10,000</DescriptionText>
//         <HiEllipsisVertical style={{ marginLeft: "auto", fontSize: "20px" }} />
//       </FlexRow>
//     </StyledGrid>
//   );
// }

// function OrderListHeader() {
//   return (
//     <StyledGridHeader>
//       <DescriptionText desc="bold">Order</DescriptionText>
//       <DescriptionText desc="bold">Date</DescriptionText>
//       <DescriptionText desc="bold">Restaurant</DescriptionText>
//       <DescriptionText desc="bold">Payment</DescriptionText>
//       <DescriptionText desc="bold">Status</DescriptionText>
//       <DescriptionText desc="bold">Price</DescriptionText>
//     </StyledGridHeader>
//   );
// }

// function OrderList() {
//   return (
//     <StyledOrderGrid>
//       <OrderListHeader />
//       <OrderListItems />
//       <OrderListItems />
//       <OrderListItems />
//       <OrderListItems />
//       <OrderListItems />
//       <OrderListItems />
//       <OrderListBottom />
//     </StyledOrderGrid>
//   );
// }

function EmptyOrder() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <FaReceipt fontSize={"60px"} />
      <DescriptionText desc="bold-xl">No orders yet</DescriptionText>
      <DescriptionText desc="true">
        When you place your requested order, it will appear here
      </DescriptionText>
      <ActionButton
        onClick={() => navigate("/restaurants")}
        width={"50px"}
        br="var(--border-radius-xlg)"
      >
        Find food
      </ActionButton>
    </div>
  );
}

function OrderList() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const allSearchParams = Object.fromEntries(
  //   Array.from(searchParams).map((params) => params)
  // );
  // console.log(allSearchParams);

  // SHOW EACH ORDER LISTS
  return (
    <div style={{ marginTop: "40px" }}>
      {/* <Urder /> */}
      {/* <Urder />
      <Urder />
      <Urder /> */}
      <EmptyOrder />
    </div>
  );
}

export default OrderList;
