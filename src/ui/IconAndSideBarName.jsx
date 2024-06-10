/* eslint-disable react/prop-types */
import styled from "styled-components";
import IconsBackgroundTaker from "./IconsBackgroundTaker";
import StyledNavLinkCom from "./StyledNavLinkCom";

const IconBackGround = styled(IconsBackgroundTaker)`
  border-radius: 25%;
  background-color: var(--oc-gray-2);
  height: 3.5rem;
  width: 3.5rem;
  transition: all ease 0.3s;
  position: relative;
`;

// const TopNumber = styled.span`
//   font-size: 1.2rem;
//   color: #fff;
//   position: absolute;
// `;

function IconAndSideBarName({ sideBarName, to, Icon }) {
  return (
    <StyledNavLinkCom to={to}>
      <IconBackGround className="icontaker">{Icon}</IconBackGround>
      <span>{sideBarName}</span>
      {/* {numbers && <TopNumber>{numbers}</TopNumber>} */}
    </StyledNavLinkCom>
  );
}
export default IconAndSideBarName;
