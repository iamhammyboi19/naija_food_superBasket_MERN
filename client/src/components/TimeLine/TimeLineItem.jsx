/* eslint-disable react/prop-types */
// import { RiRecordCircleFill } from "react-icons/ri";
import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import { AiFillCheckCircle } from "react-icons/ai";
// AiFillCloseCircle
// import { FaCircle } from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

// import { RiRecordCircleFill } from "react-icons/ri";

const StyledTimeLineItem = styled.div`
  position: relative;
  left: 0;
  padding: 0px 10px 20px 20px;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: ${(props) =>
      props.$state === "true" ? "var(--oc-green-2)" : "var(--oc-gray-3)"};
    left: 0;
    top: 15%;
    right: 0;
    transform: translateX(50%);
  }
`;

const IconStyle = {
  position: "absolute",
  fontSize: "20px",
  left: "-2%",
  top: "5%",
  color: "var(--oc-gray-6)",
};

function TimeLineItem({
  content,
  state,
  contentDesc,
  time,
  current,
  cancelled_at,
  cancelled_desc,
}) {
  return (
    <StyledTimeLineItem $state={state} className="timelineitem">
      {current && (
        <MdCircle style={{ ...IconStyle, color: "var(--oc-yellow-6)" }} />
      )}
      {!current && state === "false" && <MdCircle style={{ ...IconStyle }} />}
      {cancelled_at === "true" && (
        <IoMdCloseCircle
          style={{
            ...IconStyle,
            color: "var(--oc-red-6)",
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        />
      )}
      {state === "true" && (
        <AiFillCheckCircle
          style={{ ...IconStyle, color: "var(--oc-green-6)" }}
        />
      )}
      <DescriptionText desc="true2">
        {content || "Order placed"}
      </DescriptionText>
      <DescriptionText desc="tiny">
        {contentDesc || cancelled_desc || ""}
      </DescriptionText>
      <DescriptionText desc="semi-tiny-s">{time || ""}</DescriptionText>
    </StyledTimeLineItem>
  );
}

export default TimeLineItem;
