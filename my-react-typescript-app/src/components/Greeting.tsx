// Greeting.tsx

import React from 'react';

// Define an interface for the component's props
interface GreetingProps {
  name: string; // 'name' prop must be a string
}

// Use React.FC (React Function Component) with props type
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;