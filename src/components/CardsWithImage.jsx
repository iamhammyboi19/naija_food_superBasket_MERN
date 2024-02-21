import styled from "styled-components";
import Title from "../ui/Title";
import DescriptionText from "../ui/DescriptionText";
import GridTemplate from "../ui/GridTemplate";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniStar } from "react-icons/hi2";
import IconsBackgroundTaker from "../ui/IconsBackgroundTaker";
import FlexSpaceBetween from "../ui/FlexSpaceBetween";
import FlexRow from "../ui/FlexRow";

// const Img = styled.img`
//   max-width: 90%;
//   border-top-right-radius: var(--border-radius-lg);
//   border-top-left-radius: var(--border-radius-lg);
//   object-fit: cover;
// `;

const TakeCover = styled.div`
  padding: 1rem;
  border-top: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 2px 3px;
`;

const CardsCon = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--oc-gray-3);
  border-radius: var(--border-radius-lg);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0.5px 2px;
  overflow: hidden;
  background-color: var(--oc-white);
  z-index: -99;
  width: 100%;
`;

const Figure = styled.figure`
  height: 15rem;
  background-image: url(${(props) => props.$path});
  background-size: 50%;
  background-position: top;
`;

const Favorite = styled(IconsBackgroundTaker)`
  position: absolute;
  height: 2rem;
  width: 2rem;
  top: 2%;
  right: 4%;
`;

function CardsWithImage() {
  return (
    <GridTemplate cols={3}>
      <CardsCon>
        <Figure $path={"/Meal-Plan-plate-protein.webp"}>
          {/* <Img src="/Meal-Plan-plate-protein.webp" alt="mountain" /> */}
        </Figure>
        <TakeCover>
          <FlexSpaceBetween>
            <Title as="h6">Html css course</Title>
            <FlexRow gap="0.5rem">
              <HiMiniStar />
              <DescriptionText desc="true">3.1 (1000)</DescriptionText>
            </FlexRow>
          </FlexSpaceBetween>
          <DescriptionText desc="true">
            Burger, Tech, Toast Sandwich
          </DescriptionText>
        </TakeCover>
        <Favorite>
          <HiOutlineHeart fontSize={"1.5rem"} color="var(--oc-red-8)" />
        </Favorite>
      </CardsCon>
      <CardsCon>
        <Figure $path={"/Meal-Plan-plate-protein.webp"}>
          {/* <Img src="/Meal-Plan-plate-protein.webp" alt="mountain" /> */}
        </Figure>
        <TakeCover>
          <Title as="h6">Html css course</Title>
          <DescriptionText desc="true">
            Burger, Tech, Toast Sandwich
          </DescriptionText>
        </TakeCover>
        <Favorite>
          <HiOutlineHeart fontSize={"1.5rem"} color="var(--oc-red-8)" />
        </Favorite>
      </CardsCon>
      <CardsCon>
        <Figure $path={"/Meal-Plan-plate-protein.webp"}>
          {/* <Img src="/Meal-Plan-plate-protein.webp" alt="mountain" /> */}
        </Figure>
        <TakeCover>
          <Title as="h6">Html css course</Title>
          <DescriptionText desc="true">
            Burger, Tech, Toast Sandwich
          </DescriptionText>
        </TakeCover>
        <Favorite>
          <HiOutlineHeart fontSize={"1.5rem"} color="var(--oc-red-8)" />
        </Favorite>
      </CardsCon>
      <CardsCon>
        <Figure $path={"/Meal-Plan-plate-protein.webp"}>
          {/* <Img src="/Meal-Plan-plate-protein.webp" alt="mountain" /> */}
        </Figure>
        <TakeCover>
          <Title as="h6">Html css course</Title>
          <DescriptionText desc="true">
            Burger, Tech, Toast Sandwich
          </DescriptionText>
        </TakeCover>
        <Favorite>
          <HiOutlineHeart fontSize={"1.5rem"} color="var(--oc-red-8)" />
        </Favorite>
      </CardsCon>
    </GridTemplate>
  );
}

export default CardsWithImage;
