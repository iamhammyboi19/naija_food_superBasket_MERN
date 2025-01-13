import styled from "styled-components";
import AutoEvents from "../components/AutoScroll/AutoEvents";
import Footer from "../components/Footer/Footer";
import HeaderBody from "../components/Headers/HeaderBody";
import NewSection from "../components/NewSection";
import HomeHeaderNav from "../components/Headers/HomeHeaderNav";
import { useState } from "react";
import AutoSvgs from "../components/AutoScroll/AutoSvgs";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2rem;
  padding: 3rem 5rem;
  margin: 3rem auto 25rem auto;

  @media (max-width: 71.6875em) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3rem;
  }

  @media (max-width: 37.5em) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function Home() {
  const [navHeight, setNavHeight] = useState(null);
  return (
    <div>
      <HomeHeaderNav setNavHeight={setNavHeight} />
      <HeaderBody navHeight={navHeight} />
      <AutoEvents />
      <Grid>
        <NewSection
          heading="Start selling"
          imgpath="/header-body-images/pic-7.webp"
          index={1}
        />
        <NewSection
          heading="Deliver happiness"
          imgpath="/header-body-images/pic-9.webp"
          index={2}
        />
        <NewSection
          heading="Behind the scenes"
          imgpath="/header-body-images/pic-8.jpeg"
          index={3}
        />
      </Grid>

      <AutoSvgs />
      <Footer />
      {/* HELLO THERE */}
    </div>
  );
}

export default Home;
