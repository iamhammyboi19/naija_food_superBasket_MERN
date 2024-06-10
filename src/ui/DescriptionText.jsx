/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledDesText = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.7;

  ${(props) =>
    props.$al === "center" &&
    css`
      text-align: center;
      font-size: 1.2rem;
      color: var(--oc-gray-8);
    `}

  ${(props) =>
    props.$desc === "true" &&
    css`
      font-size: 1.3rem;
      color: var(--oc-gray-8);
      font-weight: 400;
      letter-spacing: 0.5px;

      @media (max-width: 31.25em) {
        font-size: 1rem;
        letter-spacing: 0.2px;
      }
    `}


  ${(props) =>
    props.$desc === "bold" &&
    css`
      font-size: 1.2rem;
      color: var(--oc-gray-8);
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;

      @media (max-width: 31.25em) {
        font-size: 1rem;
        letter-spacing: 0.2px;
      }
    `}

    ${(props) =>
    props.$desc === "bold-xl" &&
    css`
      font-size: 2rem;
      color: var(--oc-gray-8);
      font-weight: 600;
      letter-spacing: 0.3px;
    `}

    ${(props) =>
    props.$desc === "fade-bold-wm" &&
    css`
      font-size: 1.5rem;
      color: var(--oc-gray-7);
      font-weight: 500;
      letter-spacing: 0.6px;
      margin-bottom: 1rem;
    `}

    ${(props) =>
    props.$desc === "fade-bold" &&
    css`
      font-size: 1.3rem;
      color: var(--oc-gray-7);
      font-weight: 500;
      letter-spacing: 0.6px;

      @media (max-width: 31.25em) {
        font-size: 1rem;
        letter-spacing: 0.2px;
      }
    `}

    ${(props) =>
    props.$desc === "semi-bold" &&
    css`
      font-size: 1.3rem;
      color: var(--oc-gray-7);
      font-weight: 500;
      letter-spacing: 0.6px;
    `}

    ${(props) =>
    props.$desc === "tiny" &&
    css`
      font-size: 1.2rem;
      color: var(--oc-gray-6);
      font-weight: 400;
    `}


    ${(props) =>
    props.$desc === "semi-tiny" &&
    css`
      font-size: 1.2rem;
      color: var(--oc-gray-7);
      font-weight: 500;

      @media (max-width: 34.25em) {
        font-size: 1rem;
      }
    `}


    ${(props) =>
    props.$desc === "long" &&
    css`
      font-size: 2.5rem;
      color: var(--oc-gray-8);
      font-weight: 500;

      @media (max-width: 34.25em) {
        font-size: 1.5rem;
      }
    `}
`;

function DescriptionText({ children, desc, al }) {
  return (
    <StyledDesText $desc={desc} $al={al}>
      {children}
    </StyledDesText>
  );
}

export default DescriptionText;
