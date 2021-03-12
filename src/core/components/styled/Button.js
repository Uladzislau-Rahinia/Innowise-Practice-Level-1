import styled from 'styled-components';

const Button = styled.button`
  max-width: 280px;
  width: 40%;
  height: 30px;
  background-color: ${(props) => (props.isDanger ? 'red' : 'orange')};
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`;

export default Button;
