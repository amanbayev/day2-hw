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
  // localStorage.clear();
  const [taskTitle, setTaskTitle] = React.useState('');
  const [tasks, setTasks] = React.useState(
    localStorage.getItem('myNFactTasksHW21')
      ? JSON.parse(localStorage.getItem('myNFactTasksHW21'))
      : [],
  );
  React.useEffect(() => {
    localStorage.setItem('myNFactTasksHW21', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.length) {
      let newTask = {
        title: taskTitle,
        isChecked: false,
      };
      setTasks(tasks.concat(newTask));
      setTaskTitle('');
    }
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
    setTasks(tasksArray);
    localStorage.setItem('myNFactTasksHW21', JSON.stringify(tasks));
  };

  const onEdit = (index, newValue) => {
    const tasksArray = tasks;
    tasksArray[index].title = newValue;
    setTasks(tasksArray);
    localStorage.setItem('myNFactTasksHW21', JSON.stringify(tasks));
  };

  return (
    <MainContainer>
      <Header>Todo List</Header>
      <InputRow>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <TextInput value={taskTitle} onChange={onTextChange} />
          <AddButton type="submit" onClick={addTask}>
            Add new task
          </AddButton>
        </form>
      </InputRow>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          index={index}
          onDelete={onDelete}
          onEdit={onEdit}
          onCheckedChange={onCheckedChange}
        />
      ))}
    </MainContainer>
  );
}

export default App;
