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
      font-size: 10px;
      color: var(--oc-gray-6);
    `}

  ${(props) =>
    props.$bdb === "yes" &&
    css`
      border-bottom: 1px solid var(--oc-gray-5);
      padding: 10px;
      display: flex;
      justify-content: space-between;
    `}

  ${(props) =>
    props.$desc === "true" &&
    css`
      font-size: 1.1rem;
      color: var(--oc-gray-8);
      font-weight: 400;
      letter-spacing: 0.5px;
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */

      @media (max-width: 31.25em) {
        /* font-size: 11px; */
        letter-spacing: 0.2px;
      }
    `}

    ${(props) =>
    props.$desc === "true2" &&
    css`
      font-size: 13px;
      color: var(--oc-gray-8);
      font-weight: 400;
      letter-spacing: 0.5px;
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */

      @media (max-width: 31.25em) {
        font-size: 11px;
        letter-spacing: 0.2px;
      }
    `}

    ${(props) =>
    props.$bg &&
    css`
      background-color: ${(props) => props.$bg};
    `}


  ${(props) =>
    props.$desc === "bold" &&
    css`
      font-size: 1.2rem;
      color: ${(props) => (props.$color ? props.$color : "var(--oc-gray-8)")};
      font-weight: 600;
      letter-spacing: 0.5px;
      /* text-transform: uppercase; */

      @media (max-width: 31.25em) {
        font-size: 1rem;
        letter-spacing: 0.2px;
      }
    `}

    ${(props) =>
    props.$desc === "bold-xl" &&
    css`
      font-size: 1.6rem;
      color: ${(props) => (props.$color ? props.$color : "var(--oc-gray-8)")};
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
      font-weight: 400;
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
      letter-spacing: 0.4px;
    `}

    ${(props) =>
    props.$desc === "tiny" &&
    css`
      font-size: 1.2rem;
      color: var(--oc-gray-6);
      font-weight: 300;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}


    ${(props) =>
    props.$desc === "semi-tiny" &&
    css`
      font-size: 10px;
      color: var(--oc-gray-6);
      font-weight: 500;

      /* @media (max-width: 34.25em) {
        font-size: 1rem;
      } */
    `}
    ${(props) =>
    props.$desc === "semi-tiny-s" &&
    css`
      font-size: 10px;
      color: var(--oc-green-9);
      font-weight: 500;

      /* @media (max-width: 34.25em) {
        font-size: 1rem;
      } */
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

function DescriptionText({ children, desc, al, bdb, bg, color }) {
  return (
    <StyledDesText $desc={desc} $al={al} $bdb={bdb} $bg={bg} $color={color}>
      {children}
    </StyledDesText>
  );
}

export default DescriptionText;
