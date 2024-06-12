import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 14px;
  padding: 12px;
  background-color: var(--oc-gray-1);
  border: 1px solid
    ${(props) =>
      props.type === "white" ? "var(--oc-gray-1)" : "var(--oc-gray-5)"};
  border-radius: var(--border-radius-sm);
  /* background-color: var(--oc-gray-0); */
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default StyledSelect;
