---
title: Javascript Fetch
---

# Javascript Fetch

```typescript
const parseJSON = async (r: Response) => {
  try {
    const v = r.json();
    return v;
  } catch (e) {
    throw new Error(e);
  }
};

fetch("/api")
  .then(parseJSON)
  .then(console.log);
```
