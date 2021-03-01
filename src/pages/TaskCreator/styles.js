import styled from "styled-components";

export const TaskCreatorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TaskCreatorContainer = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & > * {
    margin-bottom: 10px;
  }

  & > span {
    font-size: 20px;
  }
`;

export const StyledTextArea = styled.textarea`
  border: 2px solid orange;
  width: 280px;
  height: 200px;
`;
