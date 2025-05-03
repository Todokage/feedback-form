// src/redux/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all', // 'all', 'done', 'not'
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(), // Simple unique ID based on timestamp
        description: action.payload,
        isDone: false,
      });
    },
    toggleDone: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    editTask: (state, action) => {
      const { id, description } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.description = description;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleDone, editTask, setFilter } = taskSlice.actions;

export default taskSlice.reducer;