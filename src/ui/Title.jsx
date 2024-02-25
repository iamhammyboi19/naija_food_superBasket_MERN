/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledTitle = styled.h1`
  ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1.4rem;
      letter-spacing: 1.1px;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      letter-spacing: 0.4px;
      margin-top: 0.5rem;
      color: var(--oc-gray-9);
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      letter-spacing: 0.3px;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      color: var(--oc-gray-8);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 3rem;
      letter-spacing: 0.4px;
      font-weight: 600;
      color: var(--oc-gray-9);
      margin-bottom: 1rem;
    `}

  ${(props) =>
    props.as === "h6" &&
    css`
      font-size: 1.3rem;
      letter-spacing: 0.4px;
      margin-top: 0.5rem;
      margin-bottom: 0.4rem;
      font-weight: 500;
      color: var(--oc-gray-7);
    `}
`;

function Title({ children, as }) {
  return <StyledTitle as={as}>{children}</StyledTitle>;
}

export default Title;
