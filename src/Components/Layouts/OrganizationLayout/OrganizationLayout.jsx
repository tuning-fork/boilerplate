import Navbar from "../../design/Navbar/Navbar";
import Sidebar from "../../design/Sidebar/Sidebar";
import { useCurrentUser } from "../../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../../Contexts/currentOrganizationContext";
import "./OrganizationLayout.css";

export default function OrganizationLayout(props) {
  const { user } = useCurrentUser();
  const { currentOrganization } = useCurrentOrganization();

  return (
    <main className="organization-layout">
      <Navbar organizationName={currentOrganization.name} user={user} />
      <div className="organization-layout__content">
        <Sidebar />
        {props.children}
      </div>
    </main>
  );
}
