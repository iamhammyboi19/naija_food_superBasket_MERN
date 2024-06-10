/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "./Title";
import ActionButton from "./ActionButton";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 999999999999999;

  & p {
    color: var(--color-gray-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  additonalMsg,
}) {
  // console.log("onConfirm", onConfirm);
  return (
    <StyledConfirmDelete>
      <Title as="h3">Delete {resourceName}</Title>
      <p>
        Are you sure you want to delete {resourceName} permanently? This action
        cannot be undone. {additonalMsg || ""}
      </p>

      <div>
        <ActionButton
          fg="var(--oc-gray-9)"
          bg="var(--oc-white)"
          bd="var(--oc-gray-5)"
          br="var(--border-radius-sm)"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </ActionButton>
        <ActionButton
          bg="var(--oc-red-9)"
          fg="var(--oc-white)"
          bd="var(--oc-red-9)"
          br="var(--border-radius-sm)"
          disabled={disabled}
          onClick={() => {
            console.log("onconfirmed");
            onConfirm();
          }}
        >
          Delete
        </ActionButton>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
