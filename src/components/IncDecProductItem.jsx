import styled from "styled-components";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";

const IncreaseOrDecreaseCart = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--oc-gray-6);
  border-radius: var(--border-radius-lg);
  padding: 3px 8px 3px 8px;
  gap: 3px;

  & span {
    border-right: 1px solid var(--oc-gray-4);
    border-left: 1px solid var(--oc-gray-4);
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 500;
    font-size: 12px;
  }
`;

const styleicon = {
  fontSize: "1.5rem",
  color: "var(--oc-blue-8)",
  strokeWidth: "1.5",
  cursor: "pointer",
};

function IncDecProductItem() {
  return (
    <div>
      <IncreaseOrDecreaseCart>
        <HiMiniMinus {...styleicon} />
        <span>1</span>
        <HiMiniPlus {...styleicon} />
      </IncreaseOrDecreaseCart>
    </div>
  );
}

export default IncDecProductItem;
