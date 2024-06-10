/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import { HiOutlinePlusCircle, HiOutlineXCircle } from "react-icons/hi2";
import styled from "styled-components";
import FilterOptions from "./FilterOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  hideFilter,
  removeFilterType,
  // removeQuery,
  showFilter,
} from "../../allRedux/filterSlice";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Span = styled.span`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 5px;
  padding: 1px 9px;
  border: 1px solid var(--oc-gray-4);
  color: var(--oc-gray-6);
  font-weight: 500;
  border-style: dashed;
  border-radius: var(--border-radius-xlg);
  cursor: pointer;
`;

const StyledshowFilterDets = styled.span`
  font-size: 1.2rem;
  color: var(--oc-indigo-8);
`;

const StyledLineHeight = styled.span`
  display: inline-block;
  height: 10px;
  width: 1px;
  background-color: var(--oc-gray-6);
  justify-self: center;
`;

function ShowFilterDets({ filterInput, filterType }) {
  return (
    <span>
      {" "}
      <StyledshowFilterDets>{filterType}</StyledshowFilterDets>{" "}
      <StyledshowFilterDets>{filterInput}</StyledshowFilterDets>
    </span>
  );
}

function MainFilter({
  filterName,
  filterDetails,
  showInput,
  aside,
  asideOptions,
}) {
  const {
    open,
    filterName: name,
    queries,
  } = useSelector((state) => state.filter);

  //
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [filterType, setFilterType] = useState("");

  // manipulate filter name to have paymentmethod instead of Payment method and convert all to lowercase
  const manipulatedFilterName =
    filterName.toLowerCase() === "date"
      ? "createdAt"
      : filterName.toLowerCase().split(" ").join("");

  // const getSearchParams = searchParams.get(manipulatedFilterName);

  // take the manipulatedFilterName out of the filtered url
  // eg [['amount[lt]', '2500'], ['createdAt[lt]', '273688474500']]
  const allSearchParamsArray = Array.from(searchParams).map((params) => params);

  // const allSearchParamsName = allSearchParamsArray.map((el) => el?.at(0));

  const currentSearchParams = allSearchParamsArray
    .filter((el) => el?.at(0)?.startsWith(manipulatedFilterName))
    ?.at(0)
    ?.at(1);

  const currentSearchParams2 = allSearchParamsArray.filter((el) =>
    el?.at(0)?.startsWith(manipulatedFilterName)
  );

  console.log("currentSearchParams2", currentSearchParams2);

  //
  return (
    <div>
      <Span dash={currentSearchParams?.length > 0}>
        {queries.includes(filterName) ? (
          <HiOutlineXCircle
            style={{
              color: "var(--oc-gray-6)",
              fontSize: "1.5rem",
              strokeWidth: "2",
            }}
            onClick={() => {
              dispatch(hideFilter());
              // dispatch(removeQuery(filterName));
              dispatch(removeFilterType());
              // remove query param from url
              setSearchParams((params) => {
                params.delete(manipulatedFilterName);
                return params;
              });
            }}
          />
        ) : (
          <HiOutlinePlusCircle
            style={{
              color: "var(--oc-gray-6)",
              fontSize: "1.5rem",
              strokeWidth: "2",
            }}
            onClick={() => dispatch(showFilter({ filterName }))}
          />
        )}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            justifyItems: "center",
          }}
        >
          {filterName}
          {currentSearchParams && (
            <>
              <StyledLineHeight />
            </>
          )}
          {currentSearchParams && (
            <ShowFilterDets
              filterType={filterType}
              filterInput={showInput ? currentSearchParams || "" : ""}
            />
          )}
        </span>
      </Span>
      {open && name === filterName && (
        <FilterOptions
          filterDetails={filterDetails}
          filterName={filterName}
          showInput={showInput}
          aside={aside}
          asideOptions={asideOptions}
          setFilterType={setFilterType}
        />
      )}
    </div>
  );
}

export default MainFilter;
