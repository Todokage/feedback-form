// Import React and Component from 'react'
import React, { Component } from 'react';

// Define interface for component props (none in this case)
interface CounterProps {}

// Define interface for component state
interface CounterState {
  count: number; // count is a number
}

// Class component with typed props and state
class Counter extends Component<CounterProps, CounterState> {
  // Initialize state with type inference
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  // Method to increment the count, with proper typing
  increment = (): void => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        {/* Display current count */}
        <p>Count: {this.state.count}</p>
        {/* Button to trigger increment */}
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;