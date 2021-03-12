import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer, StyledCheckbox, Icon } from './styles';

const Checkbox = ({ checked, onChange, value }) => (
  <CheckboxContainer>
    <StyledCheckbox checked={checked} onClick={onChange} id={value}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Checkbox;
