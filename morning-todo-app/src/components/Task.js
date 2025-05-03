// src/components/Task.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDone, editTask } from '../taskSlice';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleToggleDone = () => {
    dispatch(toggleDone(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTask({ id: task.id, description: newDescription }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewDescription(task.description); // Revert changes
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={handleToggleDone}
        style={{ marginRight: '10px' }}
      />
      {isEditing ? (
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ flexGrow: 1, marginRight: '10px', padding: '5px' }}
        />
      ) : (
        <span style={{ flexGrow: 1, textDecoration: task.isDone ? 'line-through' : 'none' }}>
          {task.description}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={handleSave} style={{ marginRight: '5px', padding: '5px 10px' }}>Save</button>
          <button onClick={handleCancel} style={{ padding: '5px 10px' }}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit} style={{ padding: '5px 10px' }}>Edit</button>
      )}
    </div>
  );
};

export default Task;