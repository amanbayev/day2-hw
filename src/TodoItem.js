import React, { useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 500px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;

const DeleteButton = styled.button``;

const Checkbox = styled.input`
  background-color: green;
`;

const TitleGreen = styled.div`
  color: green;
`;

const TitleBlack = styled.div`
  color: black;
`;

function TodoItem({ task, index, onDelete, onCheckedChange, onEdit }) {
  const [checked, setChecked] = useState(task.isChecked);
  const [currentTitle, setTitle] = useState(task.title);
  const [isEditing, setEditing] = useState(false);

  const onDeleteClick = () => {
    onDelete(index);
  };

  const onCheckClick = () => {
    onCheckedChange(index);
    setChecked(!checked);
  };

  const onEditClick = () => {
    onEdit(index, currentTitle);
    setEditing(false);
  };
  return (
    <MainContainer>
      <Checkbox
        type="checkbox"
        checked={task.isChecked}
        onChange={onCheckClick}
      />
      {checked ? (
        <TitleGreen>
          {isEditing ? (
            <input
              value={currentTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <span>{currentTitle}</span>
          )}
        </TitleGreen>
      ) : (
        <TitleBlack>
          {isEditing ? (
            <input
              value={currentTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            currentTitle
          )}
        </TitleBlack>
      )}
      {isEditing ? (
        <button onClick={onEditClick}>Save</button>
      ) : (
        <button onClick={(e) => setEditing(true)}>Edit</button>
      )}
      <DeleteButton onClick={onDeleteClick}> Delete Item </DeleteButton>
    </MainContainer>
  );
}

export default TodoItem;
