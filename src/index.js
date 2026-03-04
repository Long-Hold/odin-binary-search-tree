import { Tree } from './modules/bst.js';

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

function oneHundredRandomNumbers() {
  const arr = [];
  for (let i = 0; i < 100; ++i) {
    const randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    arr.push(randomNumber);
  }

  return arr;
}

const arr = oneHundredRandomNumbers();
const tree = new Tree(arr);
console.log(tree.isBalanced());

const logFunc = function (value) {
  console.log(`Value: ${value}`);
};
console.log('Level Order: ');
tree.levelOrderForEach(logFunc);

console.log('Pre Order: ');
tree.preOrderForEach(logFunc);

console.log('Post Order: ');
tree.postOrderForEach(logFunc);

console.log('In Order: ');
tree.inOrderForEach(logFunc);

tree.insert(123);
tree.insert(23234234);
tree.insert(13234234);
tree.insert(50000);
tree.insert(44444);
console.log(tree.isBalanced()); // Should be false

tree.rebalance();
console.log(tree.isBalanced()); // Should be true

console.log('Level Order: ');
tree.levelOrderForEach(logFunc);

console.log('Pre Order: ');
tree.preOrderForEach(logFunc);

console.log('Post Order: ');
tree.postOrderForEach(logFunc);

console.log('In Order: ');
tree.inOrderForEach(logFunc);

prettyPrint(tree.root);
