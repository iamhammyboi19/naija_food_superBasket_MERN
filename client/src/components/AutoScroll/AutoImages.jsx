/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";

const StyledFigure = styled.figure`
  max-width: 25rem;
  height: 35rem;
  border-radius: 10px;
  overflow: hidden;
  clip-path: polygon(
    0 0,
    50% 3%,
    100% 0,
    100% 100%,
    75% 97%,
    20% 100%,
    0 100%,
    0% 20%
  );
`;

const scrollImages = keyframes`
  from{
    transform: translateY(0);
  }
  to{
    transform: translateY(calc(-100% - 3rem));
  }
`;

const scrollImagesReverse = keyframes`
  from{
    transform: translateY(calc(-100% - 3rem));
  }
  to{
    transform: translateY(0);
  }
`;

const StyledImageFigureCon = styled.div`
  display: flex;
  gap: 3rem;
  flex-direction: column;
  animation: ${scrollImages} 30s linear infinite;
`;

const StyledImageFigureConReverse = styled.div`
  display: flex;
  gap: 3rem;
  flex-direction: column;
  animation: ${scrollImagesReverse} 30s linear infinite;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledAutoImages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StyledAutoImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 3rem;
  column-gap: 2rem;
  margin: 0 auto;
  height: 60rem;
  max-width: 55rem;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    position: absolute;
    height: 10rem;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), #fff);
    z-index: 1;
  }
`;

function ImageFigure({ img }) {
  return (
    <StyledFigure>
      <Img src={img} />
    </StyledFigure>
  );
}

function ImageFigureCon() {
  return (
    <StyledImageFigureCon>
      <ImageFigure img="/header-body-images/pic-1.webp" />
      <ImageFigure img="/header-body-images/pic-2.webp" />
      <ImageFigure img="/header-body-images/pic-3.webp" />
    </StyledImageFigureCon>
  );
}

function ImageFigureConReverse() {
  return (
    <StyledImageFigureConReverse>
      <ImageFigure img="/header-body-images/pic-4.webp" />
      <ImageFigure img="/header-body-images/pic-5.webp" />
      <ImageFigure img="/header-body-images/pic-6.webp" />
    </StyledImageFigureConReverse>
  );
}

function AutoImages() {
  return (
    <StyledAutoImagesGrid>
      <StyledAutoImages>
        <ImageFigureCon />
        <ImageFigureCon />
      </StyledAutoImages>
      <StyledAutoImages>
        <ImageFigureConReverse />
        <ImageFigureConReverse />
      </StyledAutoImages>
    </StyledAutoImagesGrid>
  );
}

export default AutoImages;
//
