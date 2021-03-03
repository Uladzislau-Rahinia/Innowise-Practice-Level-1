import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const RedirectWrapper = (props) => {
  const { isRedirect } = props;
  return isRedirect ? <Redirect {...props} /> : "";
};

RedirectWrapper.propTypes = {
  isRedirect: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
};

export default RedirectWrapper;
