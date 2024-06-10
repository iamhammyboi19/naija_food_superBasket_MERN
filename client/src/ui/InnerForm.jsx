/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import InnerButton from "./InnerButton";

const StyledInnerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: ${(props) => props.$width || "30rem"};

  ${(props) =>
    props.$bd &&
    css`
      border: 1px solid var(--oc-gray-4);
      border-radius: var(--border-radius-sm);
      padding: 10px;
      margin: 20px 0px;
      background-color: var(--oc-gray-1);
      gap: 1rem;
    `}

  & label {
    font-size: 1.4rem;
    color: var(--oc-gray-8);
  }
`;

const InnerButtontDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  /* justify-items: flex-end; */
`;

function InnerForm({
  children,
  onCloseModal,
  onSubmit,
  reset,
  isLoading,
  restrict_submit = false,
  btnName,
  bd,
  width,
  nc,
  type,
}) {
  return (
    <StyledInnerForm
      $bd={bd}
      $width={width}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
        reset?.();
        onCloseModal?.();
      }}
    >
      {children}
      <InnerButtontDiv>
        {nc !== "yes" && (
          <InnerButton
            bg="var(--oc-gray-1)"
            tc="var(--oc-gray-9)"
            bc="var(--oc-gray-4)"
            onClick={() => {
              onCloseModal?.();
              reset?.();
            }}
            type="reset"
          >
            Cancel
          </InnerButton>
        )}
        <InnerButton type={type} disabled={restrict_submit || isLoading}>
          {btnName || "Save"}
        </InnerButton>
      </InnerButtontDiv>
    </StyledInnerForm>
  );
}

export default InnerForm;
