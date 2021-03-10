import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styles';

const Button = (props) => {
  const { isDanger, onClick, text } = props;
  return (
    <StyledButton isDanger={isDanger} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

Button.propTypes = {
  isDanger: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Button.defaultProps = {
  isDanger: false,
  text: '',
};

export default Button;
