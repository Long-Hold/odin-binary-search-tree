# Balanced Binary Search Tree

A JavaScript implementation of a self-balancing Binary Search Tree (BST), written as part of The Odin Project curriculum.

## Overview

The `Tree` class builds a balanced BST from an array of numbers and exposes methods for insertion, deletion, traversal, and rebalancing. Duplicate values are silently ignored throughout.

## Project Structure
```
src/
  index.js          # Driver script demonstrating Tree usage
  modules/
    bst.js          # Tree and Node class implementations
  tests/
    bst.test.js     # Jest test suite
```

## Getting Started

**Requirements:** Node.js >= 20
```bash
npm install
node src/index.js   # Run the driver script
npm test            # Run the test suite
npm run format      # Format with Prettier
```

## API

All mutating methods return `this`, so calls can be chained.

### `new Tree(array)`

Constructs a balanced BST from the given array. Duplicates are removed and the array is sorted before building.

### `insert(value)`

Inserts a value while maintaining BST ordering. Ignored if the value already exists.

### `deleteItem(value)`

Removes the node with the given value. Handles nodes with zero, one, or two children using in-order successor replacement.

### `includes(value)`

Returns `true` if the value exists in the tree, `false` otherwise.

### `height(value)`

Returns the number of edges on the longest path from the node with the given value to a leaf. Returns `undefined` if the value is not found.

### `depth(value)`

Returns the number of edges from the root to the node with the given value. Returns `undefined` if the value is not found.

### `isBalanced()`

Returns `true` if the height difference between the left and right subtrees of every node is no greater than one.

### `rebalance()`

Reconstructs the tree from a sorted in-order traversal if the tree is unbalanced. No-op if already balanced.

### Traversal Methods

Each takes a callback and calls it with the numeric value of each node (not the node object itself). All return `this` for chaining. A `TypeError` is thrown if the argument is not a function.

- `levelOrderForEach(callback)` — breadth-first
- `inOrderForEach(callback)` — left, root, right (ascending order)
- `preOrderForEach(callback)` — root, left, right
- `postOrderForEach(callback)` — left, right, root

## Tooling

- **Jest** — test runner, with Babel for ESM support
- **ESLint** — linting (`@eslint/js` + `eslint-plugin-jest`)
- **Prettier** — code formatting
