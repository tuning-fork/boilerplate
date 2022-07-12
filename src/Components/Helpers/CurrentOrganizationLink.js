import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";

export default function CurrentOrganizationLink(props) {
  const { as: Component, to, ...restProps } = props;
  const { currentOrganization } = useCurrentOrganization();

  return (
    <Component
      {...restProps}
      to={`/organizations/${currentOrganization.id}${to}`}
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
