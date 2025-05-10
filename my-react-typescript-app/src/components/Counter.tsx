// Counter.tsx

import React, { Component } from 'react';

// Define an interface for the component's state
interface CounterState {
  count: number; // count is a number
}

// Since this component has no props, we can specify an empty object for props
class Counter extends React.Component<{}, CounterState> {
  // Initialize state with proper type
  state: CounterState = {
    count: 0
  };

  // Type the increment method
  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;