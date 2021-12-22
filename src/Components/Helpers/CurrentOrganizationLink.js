import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

export default function CurrentOrganizationLink(props) {
  const { as: Component, to, ...restProps } = props;
  const { currentOrganizationStore } = useCurrentOrganizationContext();
  const currentOrganizationId = currentOrganizationStore.currentOrganization.id;

  return (
    <Component
      {...restProps}
      to={`/organizations/${currentOrganizationId}${to}`}
    />
  );
}

CurrentOrganizationLink.propTypes = {
  as: PropTypes.elementType,
  to: PropTypes.string.isRequired,
};

CurrentOrganizationLink.defaultProps = {
  as: Link,
};
