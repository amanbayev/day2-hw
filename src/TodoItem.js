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

const Title = styled.div``;

const DeleteButton = styled.button``;

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
      <input type="checkbox" checked={task.isChecked} onChange={onCheckClick} />
      <Title>{task.title}</Title>
      <DeleteButton onClick={onDeleteClick}> Delete Item </DeleteButton>
    </MainContainer>
  );
}

export default TodoItem;
