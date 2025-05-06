import React from 'react';
import Vehicle from './vehicle.js'; 

function App() {
  // Create an instance of the Car class
  const myCar = new Vehicle("Honda", "Civic", 2023);

  return (
    <div>
      <h1>Car Information</h1>
      <p>Make: {myCar.make}</p>
      <p>Model: {myCar.model}</p>
      <p>Year: {myCar.year}</p>
      <button onClick={() => myCar.start()}>Start Car</button>
    </div>
  );
}

export default App;