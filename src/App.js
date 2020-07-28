import React from 'react';
import './App.css';
import styled from 'styled-components';

import TodoItem from './TodoItem';

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 500px;
  margin-top: 50px;
  text-align: center;
`;

const InputRow = styled.div`
  margin-top: 50px;
  flex-direction: row;
`;

const TextInput = styled.input``;

const AddButton = styled.button`
  margin-left: 50px;
`;

function App() {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  const addTask = () => {
    if (taskTitle.length) {
      let newTask = {
        title: taskTitle,
        isChecked: false,
      };
      setTasks(tasks.concat(newTask));
      setTaskTitle('');
    }
    // console.log('tasks are: ', tasks); // leftover from hw1
  };

  const onTextChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const onDelete = (index) => {
    const tasksArray = [...tasks];
    tasksArray.splice(index, 1);
    setTasks(tasksArray);
  };

  const onCheckedChange = (index) => {
    const tasksArray = tasks;
    tasksArray[index].isChecked = !tasksArray[index].isChecked;
    // console.log('Changing checked: ');
    // console.log(tasksArray);
    setTasks(tasksArray);
  };

  return (
    <MainContainer>
      <Header>Todo List</Header>
      <InputRow>
        <TextInput value={taskTitle} onChange={onTextChange} />
        <AddButton onClick={addTask}>Add new task</AddButton>
      </InputRow>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          index={index}
          onDelete={onDelete}
          onCheckedChange={onCheckedChange}
        />
      ))}
    </MainContainer>
  );
}

export default App;
