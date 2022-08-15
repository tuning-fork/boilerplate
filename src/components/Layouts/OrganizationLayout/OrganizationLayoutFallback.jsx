import Navbar from "../../design/Navbar/Navbar";
import Spinner from "../../Helpers/Spinner";
import { useCurrentUser } from "../../../contexts/currentUserContext";

export default function OrganizationLayoutFallback() {
  const { user } = useCurrentUser();

  return (
    <main className="organization-layout">
      <Navbar user={user} />
      <div className="organization-layout__content">
        <Spinner size="md" centered />
      </div>
    </main>
  );
}
