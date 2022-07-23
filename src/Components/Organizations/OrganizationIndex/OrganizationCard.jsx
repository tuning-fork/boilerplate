import Avatar from "../../design/Avatar/Avatar";
import AvatarStack from "../../design/AvatarStack/AvatarStack";
import "./OrganizationCard.css";

export default function OrganizationCard({ organization }) {
  return (
    <article className="organization-card">
      <h2>{organization.name}</h2>
      <AvatarStack max={6}>
        {organization.users.map((user) => (
          <Avatar key={user.id}>
            {user.firstName} {user.lastName}
          </Avatar>
        ))}
      </AvatarStack>
    </article>
  );
}
