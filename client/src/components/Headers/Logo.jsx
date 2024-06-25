import styled from "styled-components";

const LogoImg = styled.img`
  max-width: 3rem;
`;

const HeaderTitle = styled.h6`
  font-size: 1.4rem;
  letter-spacing: 1.2px;
  color: var(--oc-gray-9);
`;

const HomeRedirectLink = styled.a`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 0.5rem;
`;

function Logo() {
  return (
    <HomeRedirectLink href="/">
      <LogoImg src="/food_online_logo.png" alt="headerlogo" />
      <HeaderTitle>Naija Food SuperBasket</HeaderTitle>
    </HomeRedirectLink>
  );
}

export default Logo;
