import MenuView from "../components/Menus/MenuView";
import MaxWidthCenter from "../ui/MaxWidthCenter";
import useMenu from "../components/Menus/useMenu";
import SpinnerContainer from "../ui/SpinnerContainer";
import Spinner from "../ui/Spinner";

function Menu() {
  const { isLoading, menu } = useMenu();

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <div>
      <MaxWidthCenter mw="900px">
        <MenuView menu={menu} />
      </MaxWidthCenter>
    </div>
  );
}

export default Menu;
