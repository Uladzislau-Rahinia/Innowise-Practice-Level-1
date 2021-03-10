import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Button from 'core/components/Button';
import TextInput from 'core/components/textInput';
import Calendar from 'core/components/Calendar';
import ButtonLink from 'core/components/Link';
import ToastContainer, {
  showErrorToast,
  showSuccessToast,
} from 'core/services/showToast';
import {
  updateUserData,
  addUserData,
  deleteUserData,
} from 'core/services/firebaseDBQueries';
import { getUserId } from 'core/services/firebaseAuthQueries';
import { auth } from 'core/api/firebase';
import LINKS from 'core/utils/constants';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  TaskCreatorContainer,
  TaskCreatorWrapper,
  StyledTextArea,
} from './styles';

const TaskPage = (props) => {
  const { location } = props;
  const {
    isUpdate,
    textName,
    taskId,
    taskDay,
    taskDescription,
  } = location.state;

  const [chosenDay, setChosenDay] = useState(
    taskDay || format(new Date(Date.now()), 'yyyy-MM-dd'),
  );
  const [taskName, setTaskName] = useState(textName || '');
  const [description, setDescription] = useState(taskDescription || '');

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push(LINKS.LOGIN);
      }
    });
  }, []);

  const handleTaskSave = async () => {
    if (taskName === '') {
      showErrorToast('Please enter your task');
      return;
    }

    if (isUpdate) {
      const updatedTask = {
        text: taskName,
        status: false,
        description,
      };

      const queryResult = updateUserData(
        updatedTask,
        `tasks/${getUserId()}/${chosenDay}/${taskId}`,
      );
      if (queryResult) {
        showSuccessToast('Task successfully saved');
      }
    } else {
      const newTask = {
        text: taskName,
        status: false,
        description,
      };
      const queryResult = await addUserData(
        newTask,
        `tasks/${getUserId()}/${chosenDay}`,
      );
      if (queryResult) {
        history.push(LINKS.HOME);
      }
    }
  };

  const handleTaskDelete = async () => {
    const queryResult = await deleteUserData(
      `tasks/${getUserId()}/${chosenDay}/${taskId}`,
    );
    if (queryResult) history.push(LINKS.HOME);
  };

  return (
    <TaskCreatorWrapper>
      <TaskCreatorContainer>
        {isUpdate ? (
          <>
            <span>Update your task!</span>
            <span>
              This task is assigned on
              {' '}
              {chosenDay}
            </span>
          </>
        ) : (
          <>
            <span>Create your task!</span>
            <span>Choose a day</span>
            <Calendar
              chosenDay={chosenDay}
              handleChoosingDay={
                (e) => setChosenDay(e.currentTarget.id)
              }
            />
          </>
        )}
        <TextInput
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Write your task (50 symbols max)"
          maxLength={50}
        />
        <StyledTextArea
          placeholder="Write your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={handleTaskSave}
          text={isUpdate ? 'Update task' : 'Create Task'}
        />
        {isUpdate ? (
          <Button onClick={handleTaskDelete} isDanger text="Delete task" />
        ) : (
          ''
        )}
        <ButtonLink to={LINKS.HOME} text="Go back" />
      </TaskCreatorContainer>
      <ToastContainer />
    </TaskCreatorWrapper>
  );
};

TaskPage.propTypes = {
  location: PropTypes.shape({
    state: {
      isUpdate: PropTypes.bool.isRequired,
      textName: PropTypes.string,
      taskId: PropTypes.string,
      taskDay: PropTypes.string,
      taskDescription: PropTypes.string,
    },
  }).isRequired,
};

export default TaskPage;
