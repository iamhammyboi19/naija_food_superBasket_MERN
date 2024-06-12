/* eslint-disable react/prop-types */
import styled from "styled-components";
import Title from "../../ui/Title";
import DescriptionText from "../../ui/DescriptionText";
import { HiOutlineHeart, HiTruck } from "react-icons/hi2";
import { HiMiniStar } from "react-icons/hi2";
import IconsBackgroundTaker from "../../ui/IconsBackgroundTaker";
import FlexSpaceBetween from "../../ui/FlexSpaceBetween";
import FlexRow from "../../ui/FlexRow";
import { useNavigate } from "react-router-dom";
import { getCurrentDayTime } from "../../utils/helpers";
import moment from "moment";

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
  min-width: 100%;
  border: 1px solid var(--oc-gray-3);
  border-radius: var(--border-radius-lg);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0.5px 2px;
  overflow: hidden;
  background-color: var(--oc-white);
  cursor: pointer;
`;

const Figure = styled.figure`
  height: 15rem;
  background-image: url(${(props) => props.$path});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
`;

const Favorite = styled(IconsBackgroundTaker)`
  position: absolute;
  height: 2rem;
  width: 2rem;
  top: 2%;
  right: 4%;
`;

// https://i.ibb.co/CHQ5Hwr

function CardsWithImage({
  ratings,
  ratings_no,
  restaurant_name,
  menu_overview,
  restaurant_id,
  open,
}) {
  const navigate = useNavigate();
  // COMPARE CURRENT TIME TO OPEN/CLOSE TIME
  const current_time = moment(new Date(Date.now()));
  const open_time = moment(getCurrentDayTime(menu_overview.open_hour));
  const check_time = open_time.diff(current_time, "seconds");

  return (
    <CardsCon onClick={() => navigate(`/restaurants/${restaurant_id}`)}>
      <Figure $path={menu_overview.cover_photo}></Figure>
      <TakeCover>
        <FlexSpaceBetween>
          <Title as="h6">{restaurant_name}</Title>
          <FlexRow gap="0.5rem">
            <HiMiniStar color="var(--oc-red-8)" />
            <DescriptionText desc="true">
              {ratings} {`(${ratings_no})`}
            </DescriptionText>
          </FlexRow>
        </FlexSpaceBetween>
        <DescriptionText desc="true">
          Burger, Tech, Toast Sandwich
        </DescriptionText>
        <>
          <DescriptionText desc="semi-tiny">
            #{menu_overview.minimum_purchase} min order
          </DescriptionText>
          <FlexRow gap="0.5rem">
            <HiTruck color="var(--oc-green-9)" />
            <DescriptionText desc="semi-tiny-s">
              {menu_overview.delivery_fee < 1
                ? "Free Shipping"
                : `#${menu_overview.delivery_fee}`}
            </DescriptionText>
            {!open && (
              <span
                style={{
                  color: "var(--oc-red-9)",
                  fontWeight: 900,
                  fontSize: "10px",
                }}
              >
                CLOSED
              </span>
            )}
          </FlexRow>
        </>
        {check_time > 1 && check_time <= 7200 && (
          <DescriptionText desc="semi-tiny">{`Opens in ${(
            check_time / 60
          ).toFixed(0)} mins`}</DescriptionText>
        )}
      </TakeCover>
      <Favorite>
        <HiOutlineHeart fontSize={"1.5rem"} color="var(--oc-red-8)" />
      </Favorite>
    </CardsCon>
  );
}

export default CardsWithImage;
