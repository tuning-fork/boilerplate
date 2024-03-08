// import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import { Alert, List } from "@mantine/core";

const statusToPlainLanguage = (status) => {
  switch (status) {
    case 422:
      return "There were issues with the values you provided.";
    default:
      return "Something unexpected happened. Please try again.";
  }
};

export default function ErrorAlert({ error }) {
  const title = statusToPlainLanguage(error.status);

  return (
    <Alert icon={<MdError size="1.8rem" />} title={title} color="red">
      <List>
        {error.response.data.errors.map((error) => (
          <List.Item key={error}>{error}</List.Item>
        ))}
      </List>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  // error: PropTypes.any
};
