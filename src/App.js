import React, { useState, useEffect } from 'react';

import './App.css';
import styled from 'styled-components';
import TodoItem from './TodoItem';

import firebase from './firebase';

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

const useTasks = () => {
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(newTasks);
      });

    return () => unsubscribe();
  }, []);

  return tasks;
};

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const tasks = useTasks();

  const addTask = () => {
    if (taskTitle.length) {
      let newTask = {
        title: taskTitle,
        isChecked: false,
      };
      //save to firebase
      setIsLoading(true);
      firebase
        .firestore()
        .collection('tasks')
        .add(newTask)
        .then(() => {
          setTaskTitle('');
          setIsLoading(false);
        })
        .catch((err) => console.log('error adding task: ', err));
    }
  };

  const onTextChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const onDelete = (id) => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => console.log('successful delete'))
      .catch((err) => console.log('err ', err));
  };

  const onCheckedChange = (id, isChecked, title) => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .set({
        title,
        isChecked,
      })
      .then(() => console.log('updated check'))
      .catch((err) => console.log('update check err ', err));
  };

  const onEdit = (id, newValue, isChecked, callback) => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .set({
        title: newValue,
        isChecked,
      })
      .then(() => {
        console.log('update success');
        callback(false);
      })
      .catch((err) => console.log('update err ', err));
  };

  return (
    <MainContainer>
      <Header>Todo List</Header>
      <InputRow>
        {isLoading ? (
          <>
            <div class="loader"></div>
            <span>Loading</span>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <TextInput value={taskTitle} onChange={onTextChange} />
            <AddButton type="submit">Add new task</AddButton>
          </form>
        )}
      </InputRow>
      <table>
        <tbody>
          {tasks.map((task, index) => (
            <TodoItem
              key={task.id}
              task={task}
              index={index}
              onDelete={onDelete}
              onEdit={onEdit}
              onCheckedChange={onCheckedChange}
            />
          ))}
        </tbody>
      </table>
    </MainContainer>
  );
}

export default App;
