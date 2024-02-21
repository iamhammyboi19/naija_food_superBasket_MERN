/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledLabel = styled.label`
  font-weight: 600;
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
  gap: 1rem;
  align-items: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  transition: all ease 0.3s;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1rem;
  width: 100%;
  box-shadow: 0 0 0 1px var(--oc-gray-5);
  background-color: var(--oc-gray-1);

  &:hover {
    box-shadow: 0 0 0 2px var(--oc-gray-9);
    background-color: var(--oc-white);

    & label {
      color: var(--oc-gray-8);
    }
  }
`;

function RadioInput({ children }) {
  return (
    <InnerWrapper>
      {/* <StyledRadio
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel> */}
      {children}
    </InnerWrapper>
  );
}

RadioInput.Label = StyledLabel;
RadioInput.Input = StyledRadio;
RadioInput.Wrapper = Wrapper;

export default RadioInput;
