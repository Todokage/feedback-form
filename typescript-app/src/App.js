import React from 'react';
import Greeting from './components/code01';
import Counter from './components/code02';

function App() {
  return (
    <div className="App">
      
      <Greeting name="John Doe" />
      
      
      <Counter />
    </div>
  );
}

export default App;