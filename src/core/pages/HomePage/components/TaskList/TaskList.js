import React from 'react';
import LINKS from 'core/utils/constants';
import PropTypes from 'prop-types';
import Checkbox from 'core/pages/HomePage/components/Checkbox';
import { TaskListContainer, StyledLink, Task } from './styles';

const TaskList = (props) => {
  const { tasks, day, handleUpdateStatus } = props;
  return (
    <TaskListContainer>
      <span>Tasks for this day</span>
      {tasks.length ? (
        tasks.map((value) => (
          <Task>
            <Checkbox
              checked={value[1].status}
              onChange={handleUpdateStatus}
              value={value[0]}
            />
            <StyledLink
              to={{
                pathname: LINKS.TASK,
                state: {
                  isUpdate: true,
                  textName: value[1].text,
                  taskId: value[0],
                  taskDay: day,
                  taskDescription: value[1].description,
                },
              }}
            >
              <span>
                {value[1].text.length > window.innerWidth / 15
                  ? `${value[1].text.substring(0, window.innerWidth / 15)}...`
                  : value[1].text}
              </span>
            </StyledLink>
          </Task>
        ))
      ) : (
        <span className="placeholder">
          You dont have any tasks for this day
        </span>
      )}
    </TaskListContainer>
  );
};

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tasks: PropTypes.array.isRequired,
  day: PropTypes.string.isRequired,
  handleUpdateStatus: PropTypes.func.isRequired,
};

export default TaskList;
