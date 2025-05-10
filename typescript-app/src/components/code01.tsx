// Import React from the 'react' package
import React from 'react';



// Define an interface for the props the Greeting component will receive
interface GreetingProps {
  name: string; // 'name' is a string
}

// Functional component with typed props
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    // Return a simple JSX element displaying the greeting
    <div>Hello, {name}!</div>
  );
};

export default Greeting;