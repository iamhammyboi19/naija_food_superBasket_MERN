import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import IconsBackgroundTaker from "../../ui/IconsBackgroundTaker";
import { HiXCircle } from "react-icons/hi2";
import { VscEdit } from "react-icons/vsc";

const StyledToppingsOpts = styled.div`
  min-width: 30rem;
  border: 1px solid var(--oc-gray-5);
  padding: 0px 0px 10px 0px;
  border-radius: var(--border-radius-sm);
`;

const NewIconBackGroundTaker = styled(IconsBackgroundTaker)`
  height: 2rem;
  width: 2rem;
  background-color: var(--oc-gray-7);
`;

function ToppingsOptsHeader() {
  return (
    <StyledToppingsOpts>
      <DescriptionText bdb="yes" desc="semi-bold">
        <span>Toppings name</span>
        <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <HiXCircle fontSize={"2.5rem"} />
          <NewIconBackGroundTaker>
            <VscEdit color="var(--oc-white)" />
          </NewIconBackGroundTaker>
        </span>
      </DescriptionText>
    </StyledToppingsOpts>
  );
}

export default ToppingsOptsHeader;
