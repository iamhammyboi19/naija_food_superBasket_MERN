/* eslint-disable react/prop-types */
import styled from "styled-components";
import DescriptionText from "./DescriptionText";
import ActionButton from "./ActionButton";

const Img = styled.img`
  width: 50%;
  text-align: center;
`;

const EmptyCon = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 10px;

  @media (max-width: 31.8125em) {
    padding: 2rem;
  }
`;

function Empty({ message, actMsg, onClick }) {
  return (
    <div>
      <EmptyCon>
        <Img src="/emptyimg.png" alt="just different empty components" />
        <DescriptionText al="center">{message}</DescriptionText>
        {actMsg !== "" && (
          <ActionButton onClick={onClick}>{actMsg}</ActionButton>
        )}
      </EmptyCon>
    </div>
  );
}

// https://i.ibb.co/9s8WTB4/nicholas-bartos-fms2-YKam-M-unsplash.jpg
export default Empty;
