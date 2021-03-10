import React from 'react';
import PropTypes from 'prop-types';
import StyledLink from './styles';

const ButtonLink = (props) => {
  const { to, text } = props;
  return (
    <StyledLink to={to}>{text}</StyledLink>
  );
};

ButtonLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  text: PropTypes.string,
};

ButtonLink.defaultProps = {
  text: '',
};

export default ButtonLink;
