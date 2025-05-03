// src/components/ListTask.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from './Task.js';
import { setFilter } from '../taskSlice';

const ListTask = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'done') {
      return task.isDone;
    } else if (filter === 'not') {
      return !task.isDone;
    }
    return true; // Default to 'all' if filter is invalid
  });

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => dispatch(setFilter('all'))}
          style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: filter === 'all' ? '#007bff' : '#fff', color: filter === 'all' ? '#fff' : '#000' }}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter('done'))}
          style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: filter === 'done' ? '#007bff' : '#fff', color: filter === 'done' ? '#fff' : '#000' }}
        >
          Done
        </button>
        <button
          onClick={() => dispatch(setFilter('not'))}
          style={{ padding: '8px 15px', backgroundColor: filter === 'not' ? '#007bff' : '#fff', color: filter === 'not' ? '#fff' : '#000' }}
        >
          Not Done
        </button>
      </div>
      {filteredTasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ListTask;