/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "../../ui/Title";
import InputText from "../../ui/InputText";
import { StyledLongFormButton } from "../../ui/LongFormButton";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addFilterType,
  addQuery,
  hideFilter,
} from "../../allRedux/filterSlice";
import { useSearchParams } from "react-router-dom";
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
  margin-bottom: 9px;
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

function FilterOptions({ filterDetails, filterName, showInput = false }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectOpt, setSelectOpt] = useState(filterDetails?.at(0)?.value);
  const [inputVal, setInputVal] = useState("");
  let manipulatedFilterName =
    filterName.toLowerCase() === "date"
      ? "createdAt"
      : filterName.toLowerCase().split(" ").join("");
  // let newfiltername = filterName.split(" ").join("").toLowerCase();

  function handleOrderFilter() {
    //
    // e.preventDefault();

    if (showInput && inputVal === "") return;

    // let filterObj = {};
    // if (showInput) {
    //   newfiltername === "date"
    //     ? (filterObj["createdAt"] = inputVal)
    //     : (filterObj[newfiltername] = inputVal);
    // } else {
    //   filterObj[newfiltername] = selectOpt;
    // }

    // newfiltername === "date" ? (newfiltername = "createdAt") : newfiltername;

    if (selectOpt === "equal to") {
      searchParams.set(manipulatedFilterName, inputVal);
      setSearchParams(searchParams);
      dispatch(addFilterType(selectOpt));
    } else if (selectOpt === "less than" || selectOpt === "the last") {
      searchParams.set(`${manipulatedFilterName}[gte]`, inputVal);
      setSearchParams(searchParams);
      dispatch(addFilterType(selectOpt));
    } else if (selectOpt === "less than or equal to") {
      searchParams.set(`${manipulatedFilterName}[lte]`, inputVal);
      setSearchParams(searchParams);
      dispatch(addFilterType(selectOpt));
    } else if (selectOpt === "greater than") {
      searchParams.set(`${manipulatedFilterName}[gt]`, inputVal);
      setSearchParams(searchParams);
      dispatch(addFilterType(selectOpt));
    } else if (selectOpt === "greater than or equal to") {
      searchParams.set(`${manipulatedFilterName}[gte]`, inputVal);
      setSearchParams(searchParams);
      dispatch(addFilterType(selectOpt));
    } else {
      searchParams.set(`${manipulatedFilterName}`, selectOpt);
      setSearchParams(searchParams);
      dispatch(addFilterType(selectOpt));
    }
  }

  useEffect(
    function () {
      function handleClick(e) {
        if (
          ref.current &&
          ref.current.contains(e.target)
          // &&!e.target.classList.contains("filterbtn")
        )
          return;

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
      {showInput && (
        <NewInputText
          type="number"
          onChange={(e) => setInputVal(e.target.value)}
        />
      )}
      <NewLongFormButton
        className="filterbtn"
        onClick={() => {
          handleOrderFilter();
          dispatch(hideFilter());
          dispatch(addQuery(filterName));
        }}
      >
        Apply
      </NewLongFormButton>
    </Container>
  );
}

export default FilterOptions;
