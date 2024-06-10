/* eslint-disable react/prop-types */
import { HiOutlinePlusCircle, HiOutlineXCircle } from "react-icons/hi2";
import styled from "styled-components";
import FilterOptions from "./FilterOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  hideFilter,
  removeFilterType,
  removeQuery,
  showFilter,
} from "../../allRedux/filterSlice";
import { useSearchParams } from "react-router-dom";

const Span = styled.span`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 5px;
  padding: 1px 9px;
  border: 1px solid var(--oc-gray-6);
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

function ShowFilterDets({ filterType, filterInput }) {
  return (
    <>
      <StyledLineHeight></StyledLineHeight>{" "}
      <StyledshowFilterDets>
        {filterType} {filterInput}
      </StyledshowFilterDets>
    </>
  );
}

function MainFilter({ filterName, filterDetails, showInput }) {
  const {
    open,
    filterName: name,
    queries,
    filterType,
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  // manipulate filter name to have paymentmethod instead of Payment method and convert all to lowercase
  let manipulatedFilterName =
    filterName.toLowerCase() === "date"
      ? "createdAt"
      : filterName.toLowerCase().split(" ").join("");

  const getSearchParams = searchParams.get(manipulatedFilterName);
  console.log(getSearchParams);
  //
  return (
    <div>
      <Span>
        {queries.includes(filterName) ? (
          <HiOutlineXCircle
            style={{
              color: "var(--oc-gray-6)",
              fontSize: "1.5rem",
              strokeWidth: "2",
            }}
            onClick={() => {
              dispatch(hideFilter());
              dispatch(removeQuery(filterName));
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
        <span>
          {filterName}{" "}
          {filterType && queries.includes(filterName) && getSearchParams && (
            <ShowFilterDets
              filterType={filterType}
              filterInput={showInput ? getSearchParams || "" : ""}
            />
          )}
        </span>
      </Span>
      {open && name === filterName && (
        <FilterOptions
          filterDetails={filterDetails}
          filterName={filterName}
          showInput={showInput}
        />
      )}
    </div>
  );
}

export default MainFilter;
