---
title: "Styling React Components with CSS Modules"
date: "2024-01-10"
author: "Alex Johnson"
tags: ["css", "styling", "react", "css-modules"]
excerpt: "Learn how to style React components using CSS Modules for better maintainability and scoped styles."
readTime: "6 min read"
---

# Styling React Components with CSS Modules

CSS Modules provide a way to write CSS that's locally scoped to a component, preventing global style conflicts and making your styles more maintainable.

## What are CSS Modules?

CSS Modules are CSS files where all class names and animation names are scoped locally by default. This means:

- **Local scope**: Class names are automatically made unique
- **Explicit dependencies**: You must explicitly import styles
- **No global conflicts**: Styles don't leak between components

## Setting Up CSS Modules

Most modern React build tools support CSS Modules out of the box. Simply name your CSS files with the `.module.css` extension:

```
Button.jsx
Button.module.css
```

## Basic Usage

Here's how to use CSS Modules in a React component:

**Button.module.css**
```css
.button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0056b3;
}

.primary {
  background-color: #28a745;
}

.secondary {
  background-color: #6c757d;
}
```

**Button.jsx**
```jsx
import React from 'react';
import styles from './Button.module.css';

function Button({ children, variant = 'button', onClick }) {
  const className = `${styles.button} ${styles[variant]}`;
  
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
```

## Composition and Nesting

CSS Modules support composition for reusing styles:

```css
.baseButton {
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.primaryButton {
  composes: baseButton;
  background-color: #007bff;
  color: white;
}

.secondaryButton {
  composes: baseButton;
  background-color: #6c757d;
  color: white;
}
```

## Benefits

1. **Scope isolation**: No more global CSS conflicts
2. **Maintainability**: Easier to find and modify component styles
3. **Dead code elimination**: Unused styles can be detected
4. **Type safety**: With TypeScript, you can get autocomplete for class names

## Best Practices

- Use descriptive class names
- Keep styles close to components
- Use composition for shared styles
- Consider using CSS-in-JS for dynamic styles

CSS Modules provide an excellent middle ground between traditional CSS and CSS-in-JS solutions, giving you the benefits of scoped styles while maintaining the familiarity of CSS. 