/* eslint-disable react/prop-types */
import styled from "styled-components";
import { BsBasket3 } from "react-icons/bs";
import { HiEllipsisVertical, HiOutlineXMark } from "react-icons/hi2";
import ImageBackGroundCover from "../../ui/ImageBackGroundCover";
import DescriptionText from "../../ui/DescriptionText";
import FlexRow from "../../ui/FlexRow";
import MenuOverlay from "./MenuOverlay";
import { useState } from "react";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";

// import IconsBackgroundTaker from "../../ui/IconsBackgroundTaker";

const StyledMenuCard = styled.div`
  width: 25rem;
  padding: 20px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  transition-property: box-shadow;
  transition-duration: 0.4s;
  cursor: pointer;
  position: relative;
  /* z-index: -1; */

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border: 1px solid var(--oc-gray-3);
  }
  @media (max-width: 43.75em) {
    width: 100%;
  }
`;

const NewBackGroundTaker = styled.button`
  height: 35px;
  width: 35px;
  background: rgba(0, 0, 0, 0);
  transition-property: background-color;
  transition-duration: 0.4s;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--oc-gray-2);
  }
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MenusCard({ menu }) {
  const [showHide, setShowHide] = useState(false);

  return (
    <StyledMenuCard>
      <div style={{ marginBottom: "12px" }}>
        <ImageBackGroundCover
          //   path="/Meal-Plan-plate-protein.webp"
          path={menu.menu_image}
          width="200px"
          bs="cover"
          br="no"
          boxS="no"
          bp="center"
        />
      </div>
      <FlexSpaceBetween>
        <FlexRow gap="1.5rem">
          <BsBasket3 fontSize="2rem" fill="var(--oc-green-7)" />
          <div>
            <DescriptionText desc="true2">{menu.menu_name}</DescriptionText>
            <DescriptionText desc="tiny">
              Modified at{" "}
              {months[new Date(menu.createdAt).getMonth()].slice(0, 3)}{" "}
              {new Date(menu.createdAt).getDate()}
            </DescriptionText>
          </div>
        </FlexRow>
        <div>
          {showHide ? (
            <NewBackGroundTaker
              onClick={() => setShowHide((cur) => !cur)}
              className="backtaker"
            >
              <HiOutlineXMark fontSize="25px" />
            </NewBackGroundTaker>
          ) : (
            <NewBackGroundTaker
              onClick={() => setShowHide((cur) => !cur)}
              className="backtaker"
            >
              <HiEllipsisVertical fontSize="25px" />
            </NewBackGroundTaker>
          )}
        </div>
      </FlexSpaceBetween>
      <MenuOverlay menu={menu} showHide={showHide} setShowHide={setShowHide} />
    </StyledMenuCard>
  );
}

export default MenusCard;
