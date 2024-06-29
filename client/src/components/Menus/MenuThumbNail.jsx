/* eslint-disable react/prop-types */
import { RiBallPenFill } from "react-icons/ri";
import styled from "styled-components";
import DescriptionText from "../../ui/DescriptionText";
import ImageBackGroundCover from "../../ui/ImageBackGroundCover";

const StyledMenuCard = styled.div`
  width: 100%;
  padding: 30px 20px;
  border: 0.5px solid var(--oc-gray-3);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 4px 0px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 20px;

  @media (max-width: 43.75em) {
    width: 100%;
  }
`;

const StyledImageCon = styled.div`
  background-color: var(--oc-white);
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: var(--border-radius-md);
  position: relative;
  margin: 10px 0;
`;

const NewIconBackGroundTaker = styled.label`
  height: 2rem;
  width: 2rem;
  position: absolute;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid var(--oc-gray-4);
  top: -5%;
  right: -5%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
`;

function MenuThumbNail({ menu }) {
  return (
    <StyledMenuCard>
      <DescriptionText desc="true">{menu.menu_name}</DescriptionText>

      <StyledImageCon>
        <ImageBackGroundCover
          path={menu.menu_image}
          width="100px"
          bs="cover"
          boxS="no"
          height="100px"
        />
        <NewIconBackGroundTaker htmlFor="menuupload">
          <input
            type="file"
            accept="image/*"
            id="menuupload"
            style={{ display: "none" }}
            //e.target.value
            onChange={() => {
              console.log("");
            }}
          />
          <RiBallPenFill fontSize={"1rem"} color="var(--oc-gray-6)" />
        </NewIconBackGroundTaker>
      </StyledImageCon>
      <DescriptionText al="center">
        Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
        files are accepted
      </DescriptionText>
    </StyledMenuCard>
  );
}

export default MenuThumbNail;
