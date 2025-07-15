---
title: "Advanced React Patterns"
date: "2024-01-20"
author: "Jane Smith"
tags: ["react", "advanced", "patterns", "hooks"]
excerpt: "Explore advanced React patterns like render props, higher-order components, and custom hooks."
readTime: "8 min read"
---

# Advanced React Patterns

Once you've mastered the basics of React, it's time to dive into more advanced patterns that will help you write more reusable and maintainable code.

## Custom Hooks

Custom hooks are a way to extract component logic into reusable functions. They follow the same rules as React hooks and start with "use".

```jsx
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

## Render Props Pattern

The render props pattern is a technique for sharing code between React components using a prop whose value is a function.

```jsx
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}
```

## Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional functionality.

```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}
```

## Context API

The Context API provides a way to pass data through the component tree without having to pass props down manually at every level.

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

## Conclusion

These advanced patterns will help you write more maintainable and reusable React code. Remember to choose the right pattern for your specific use case and avoid over-engineering your solutions. 