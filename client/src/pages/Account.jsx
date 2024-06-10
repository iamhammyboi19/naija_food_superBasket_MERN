import EmailUpdate from "../components/Auths/EmailUpdate";
import PasswordUpdate from "../components/Auths/PasswordUpdate";
import UpdateMenuOverview from "../components/Auths/UpdateMenuOverview";
import UserUpdate from "../components/Auths/UserUpdate";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useUser from "../components/Auths/useUser";
import Title from "../ui/Title";

function Account() {
  const { role } = useUser();
  useDocumentTitle("Account | Naija Food superBasket");
  return (
    <div>
      <Title as="h2">Account Settings</Title>
      <EmailUpdate />
      <UserUpdate />
      {role === "restaurant" && <UpdateMenuOverview />}
      <PasswordUpdate />
    </div>
  );
}

export default Account;
