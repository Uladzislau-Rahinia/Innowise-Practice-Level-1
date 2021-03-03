import { Redirect } from "react-router-dom";

const RedirectWrapper = (props) => {
  const { isRedirect } = props;
  return isRedirect ? <Redirect {...props} /> : "";
};

export default RedirectWrapper;
