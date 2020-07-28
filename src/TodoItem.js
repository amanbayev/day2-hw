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

function TodoItem({ task, index, onDelete, onCheckedChange }) {
  const [checked, setChecked] = useState(task.isChecked);

  const onDeleteClick = () => {
    onDelete(index);
  };

  const onCheckClick = () => {
    onCheckedChange(index);
    setChecked(!checked);
  };

  return (
    <MainContainer>
      <Checkbox
        type="checkbox"
        checked={task.isChecked}
        onChange={onCheckClick}
      />
      {checked ? (
        <TitleGreen>{task.title}</TitleGreen>
      ) : (
        <TitleBlack>{task.title}</TitleBlack>
      )}

      <DeleteButton onClick={onDeleteClick}> Delete Item </DeleteButton>
    </MainContainer>
  );
}

export default TodoItem;
