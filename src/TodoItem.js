import React, { useState } from 'react';
import styled from 'styled-components';

// const MainContainer = styled.div`
//   width: 500px;
//   height: 40px;
//   display: flex;
//   flex-direction: row;
//   margin-top: 40px;
// `;

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
    onDelete(task.id);
  };

  const onCheckClick = () => {
    onCheckedChange(task.id, !checked, task.title);
    setChecked(!checked);
  };

  const onEditClick = () => {
    onEdit(task.id, currentTitle, checked, setEditing);
    // setEditing(false);
  };
  return (
    <tr>
      <td>
        <Checkbox
          type="checkbox"
          checked={task.isChecked}
          onChange={onCheckClick}
        />
      </td>
      <td>
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
      </td>
      <td>
        {isEditing ? (
          <button onClick={onEditClick}>Save</button>
        ) : (
          <button onClick={(e) => setEditing(true)}>Edit</button>
        )}
      </td>
      <td>
        <DeleteButton onClick={onDeleteClick}> Delete Item </DeleteButton>
      </td>
    </tr>
  );
}

export default TodoItem;
