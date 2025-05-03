// src/App.js
import React from 'react';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import './App.css'; // You can add some basic styling here

function App() {
  return (
    <div className="App" style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ddd', borderRadius: '8px', marginTop: '50px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Morning Routine ToDo</h1>
      <AddTask />
      <ListTask />
    </div>
  );
}

export default App;