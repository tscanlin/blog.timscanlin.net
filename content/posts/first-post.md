---
title: First Post
layout: Post
date: 2016-01-22
route: 2016/first-post111
---

This is the first post!

Code is highlighted by default.

```js
const StatelessComponent = (props) => {
  return (
    <div>
      I'am a stateless component that accept children
      { props.children }
    </div>
  )
}

// ...

  return (
    <StatelessComponent>
      Example of child
    </StatelessComponent>
  )
```
