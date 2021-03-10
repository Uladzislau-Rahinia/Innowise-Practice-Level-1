import React from 'react';
import PropTypes from 'prop-types';
import StyledInput from './styles';

function TextInput(props) {
  const {
    type, placeholder, onChange, value, isError, maxLength,
  } = props;

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      isError={isError}
      maxLength={maxLength}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  maxLength: PropTypes.number,
};

TextInput.defaultProps = {
  placeholder: '',
  isError: false,
  maxLength: 1000,
};

export default TextInput;
