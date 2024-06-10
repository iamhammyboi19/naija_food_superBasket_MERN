/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledLabel = styled.label`
  font-weight: 400;
  font-size: 1.3rem;
  color: var(--oc-gray-8);
  cursor: default;
  ${(props) =>
    props.$disabled &&
    css`
      color: var(--oc-gray-8);
      cursor: not-allowed;
      &::after {
        margin-left: 8px;
        width: 12px;
        height: 15px;
        display: inline-block;
        content: " ";
        -webkit-mask: url("/lock.svg") no-repeat 50% 50%;
        -webkit-mask-size: cover;
        background-color: var(--oc-gray-8);
      }
    `}
`;

const StyledRadio = styled.input`
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--oc-gray-6);
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 2px;
  }
  &:checked::after {
    background-color: var(--oc-gray-6);
  }
  &:hover::after {
    background-color: var(--oc-gray-6);
  }
  &:focus {
    outline: 2px solid var(--oc-gray-6);
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  transition: all ease 0.3s;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1rem;

  &:hover {
    background-color: var(--oc-gray-1);

    & label {
      color: var(--oc-gray-8);
    }
  }
`;

function RadioInputTypeII({
  name,
  id,
  label,
  onChange,
  value,
  price,
  checked,
}) {
  return (
    <Wrapper>
      <StyledRadio
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      {price > 0 && (
        <span style={{ marginLeft: "auto", color: "var(--oc-gray-8)" }}>
          {price}
        </span>
      )}
    </Wrapper>
  );
}

export default RadioInputTypeII;
