import React from "react";
import { CheckboxContainer, StyledCheckbox, Icon } from "./styles";

const Checkbox = ({ className, checked, onChange, value }) => (
  <CheckboxContainer className={className}>
    <StyledCheckbox checked={checked} onClick={onChange} id={value}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
