import styled from "styled-components";
import MenusCard from "../components/Menus/MenusCard";
import MenusTop from "../components/Menus/MenusTop";
import MaxWidthCenter from "../ui/MaxWidthCenter";
import useRestrictUrl from "../hooks/useRestrictUrl";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Empty from "../ui/Empty";
import useUser from "../components/Auths/useUser";

const StyledGrid = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  margin-top: 5rem;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 4rem;

  @media (max-width: 65.625em) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 43.75em) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2rem;
  }

  @media (max-width: 31.25em) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function Menus() {
  const { user } = useUser();
  useRestrictUrl("user");
  useDocumentTitle("Menu | Naija Food superBasket");
  return (
    <div>
      <MenusTop />
      {user.menus.length < 1 && (
        <Empty
          imgurl="/menu_picture.png"
          message="Your restaurant has no menu to order for customers. Click on new to add menu"
          actMsg=""
        />
      )}

      {user.menus.length > 0 && (
        <MaxWidthCenter mw="120rem">
          <StyledGrid>
            {user.menus.map((menu) => (
              <MenusCard key={menu._id} menu={menu} />
            ))}
          </StyledGrid>
        </MaxWidthCenter>
      )}
    </div>
  );
}

export default Menus;
