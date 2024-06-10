/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledGrid = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  margin-top: 5rem;

  ${(props) =>
    props.$cols &&
    css`
      grid-template-columns: repeat(${props.$cols}, 1fr);
    `}

  ${(props) =>
    props.$rows &&
    css`
      grid-template-rows: repeat(${props.$rows}, 1fr);
    `}

    column-gap: ${(props) => props.$colsgap || "3rem"};
  row-gap: 4rem;

  @media (max-width: 65.625em) {
    ${(props) =>
      props.$cols &&
      css`
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1.5rem;
        row-gap: 3rem;
      `}
  }

  @media (max-width: 47.5em) {
    ${(props) =>
      props.$cols &&
      css`
        grid-template-columns: repeat(1, 1fr);
        row-gap: 3rem;
      `}
  }
`;

function GridTemplate({ rows, cols, children, colsgap }) {
  return (
    <StyledGrid $cols={cols} $rows={rows} $colsgap={colsgap}>
      {children}
    </StyledGrid>
  );
}

export default GridTemplate;
