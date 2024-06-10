/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "../../ui/Title";
import InputText from "../../ui/InputText";
import { StyledLongFormButton } from "../../ui/LongFormButton";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { hideFilter } from "../../allRedux/filterSlice";
import { useSearchParams } from "react-router-dom";
import FlexRow from "../../ui/FlexRow";
// import { IoLogoVercel } from "react-icons/io5";

const Select = styled.select`
  font-size: 1.3rem;
  padding: 6px 12px;
  border: 1px solid
    ${(props) =>
      props.type === "white" ? "var(--oc-gray-1)" : "var(--oc-gray-3)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--oc-gray-0);
  width: 100%;
  font-weight: 500;
  margin-bottom: ${(props) => (props.$nm === "no" ? "0px" : "9px")};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--oc-gray-3);
  }
`;

const NewInputText = styled(InputText)`
  padding: 6px 9px;
  width: 80%;
  margin-left: 20%;
  border: 1px solid var(--oc-gray-1);
  background-color: var(--oc-gray-0);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--oc-gray-3);
  }
`;

const NewLongFormButton = styled(StyledLongFormButton)`
  padding: 8px;
  background-color: var(--oc-gray-9);
`;

const Container = styled.div`
  max-width: 25rem;
  background-color: var(--oc-white);
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: var(--border-radius-sm);
  position: absolute;
  top: 90%;
  z-index: 9999;
`;

function FilterOptions({
  filterDetails,
  filterName,
  showInput = false,
  aside,
  asideOptions,
  setFilterType,
}) {
  // USE FOR FILTER OVERLAY
  const ref = useRef(null);

  // MANAGE FILTER REDUX SLICE
  const dispatch = useDispatch();

  // GET, SET AND REMOVE FILTERS FROM URL
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(allSearchParams);

  // SELECT THE SET THE FILTER OPTIONS
  const [selectOpt, setSelectOpt] = useState(filterDetails?.at(0)?.value);

  // SET THE FILTER INPUT
  const [inputVal, setInputVal] = useState("");

  // MAINLY TO SET DATE AND TIME FILTER (days, weeks, hours)
  const [additionalFilter, setAdditionalFilter] = useState(
    asideOptions?.at(0)?.value
  );

  // REPLACE FILTERNAME eg DATE FILTER IS createdAt in the url query
  const manipulatedFilterName =
    filterName.toLowerCase() === "date"
      ? "createdAt"
      : filterName.toLowerCase().split(" ").join("");

  // SELECT VALUE FOR EACH DATE, PAYMENT METHOD, AMOUNT
  function handleOrderFilter() {
    if (showInput && inputVal === "") return;

    // CONVERT DATE TO MILLISECOND if not date use the inputted number
    let new_inputVal;
    if (additionalFilter === undefined) {
      new_inputVal = inputVal;
    } else if (additionalFilter === "days") {
      // CONVERT DAYS TO MILLISECONDS
      new_inputVal = inputVal * 86400000;
    } else if (additionalFilter === "weeks") {
      // CONVERT WEEKS TO MILLISECONDS
      new_inputVal = inputVal * 604800000;
    } else if (additionalFilter === "hours") {
      // CONVERT HOURS TO MILLISECONDS
      new_inputVal = inputVal * 3600000;
    }

    // CHECK EACH SELECT OPTION BASED ON FILTER TYPE
    if (selectOpt === "Exactly") {
      searchParams.set(manipulatedFilterName, new_inputVal);
      setSearchParams(searchParams);
      setFilterType(selectOpt);
    } else if (selectOpt === "Less than" || selectOpt === "Last") {
      searchParams.set(`${manipulatedFilterName}[lt]`, new_inputVal);
      setSearchParams(searchParams);
      setFilterType(selectOpt);
    } else if (selectOpt === "Less or Equal") {
      searchParams.set(`${manipulatedFilterName}[lte]`, new_inputVal);
      setSearchParams(searchParams);
      setFilterType(selectOpt);
    } else if (selectOpt === "More than") {
      searchParams.set(`${manipulatedFilterName}[gt]`, new_inputVal);
      setSearchParams(searchParams);
      setFilterType(selectOpt);
    } else if (selectOpt === "Greater or Equal") {
      searchParams.set(`${manipulatedFilterName}[gte]`, new_inputVal);
      setSearchParams(searchParams);
      setFilterType(selectOpt);
    } else {
      searchParams.set(`${manipulatedFilterName}`, selectOpt);
      setSearchParams(searchParams);
      setFilterType(selectOpt);
    }
  }

  useEffect(
    function () {
      function handleClick(e) {
        if (
          ref.current &&
          ref.current.contains(e.target)
          // &&!e.target.classList.contains("filterbtn")
        ) {
          return;
        }

        dispatch(hideFilter());
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [dispatch, searchParams]
  );

  return (
    <Container ref={ref}>
      <Title as="h6">Filter by {filterName}</Title>
      <Select
        onChange={(e) => {
          setSelectOpt(e.target.value);
        }}
        defaultValue={filterDetails.at(0).value}
      >
        {filterDetails.map((el) => (
          <option value={el.value} key={el.value}>
            {el.name}
          </option>
        ))}
      </Select>
      {showInput && aside ? (
        <>
          {
            <FlexRow>
              <NewInputText
                type="number"
                onChange={(e) => setInputVal(e.target.value)}
                min={0}
                value={inputVal}
              />
              <Select
                $nm={"no"}
                onChange={(e) => {
                  setInputVal("");
                  setAdditionalFilter(e.target.value);
                }}
                defaultValue={asideOptions.at(0).value}
              >
                {asideOptions.map((el) => (
                  <option value={el.value} key={el.value}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </FlexRow>
          }
        </>
      ) : (
        <>
          {showInput && (
            <NewInputText
              type="number"
              onChange={(e) => setInputVal(e.target.value)}
              min={0}
            />
          )}
        </>
      )}
      <NewLongFormButton
        className="filterbtn"
        onClick={() => {
          handleOrderFilter();
          dispatch(hideFilter());
          // dispatch(addQuery(filterName));
        }}
      >
        Apply
      </NewLongFormButton>
    </Container>
  );
}

export default FilterOptions;
