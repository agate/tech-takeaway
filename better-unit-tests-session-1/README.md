# Better Unit Tests -> Better Code

## How To

### Execute Tests

```bash
npm install && npm run test
```

### Folder Structure

```
code/
  big-file/
    BlogAPI.test.ts
    BlogAPI.ts
  domain-files/
    BlogAPI.test.ts
    BlogAPI.ts
    data-sources/
      Comments.test.ts
      Comments.ts
      Config.ts
      Posts.test.ts
      Posts.ts
```

`big-file` and `domain-files` are two equivalent modules. They both expose `getAllPosts` function through the `BlogAPI` file for users to use. But they structure their code / tests differently.

## Important Unit Test Concept

Isolation! Isolation! Isolation!

Isolation should apply not only at the project level but also at the module (or file) level.

### How To Isolate

Mock(Stub)

## Why The Domain Files Way Is Better

* Clear system boundaries.
  * Module doesn't need to expose unnecessary functions to the user.
  * Easy to mock return values for external functions.
* Unix philosophy - "Write programs that do one thing and do it well."
* Small file size and easy to read and review.