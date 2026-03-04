import { Tree } from "../modules/bst";

describe('class Tree', () => {
    const startingArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    let tree;
    beforeEach(() => {
        tree = new Tree(startingArray);
    });

    describe('Tree.includes()', () => {
        test('returns true if the value is the root node', () => {
            const rootVal = tree.root.value;
            expect(tree.includes(rootVal)).toBe(true);
        });
        test('returns true for any value that exists in the tree', () => {
            const arrSet = new Set(startingArray);
            for (const value of arrSet) expect(tree.includes(value)).toBe(true);
        });
        test('returns false for values that do not exist in the tree', () => {
            expect(tree.includes(0)).toBe(false);
            expect(tree.includes(10000)).toBe(false);
            expect(tree.includes(25)).toBe(false);
        });
    });
    describe('Tree.insert()', () => {
        test('inserts a value into the tree', () => {
            expect(tree.includes(9999)).toBe(false);
            tree.insert(9999);
            expect(tree.includes(9999)).toBe(true);
        });
    });
    describe('Tree.deleteItem()', () => {
        test('deletes node with no children', () => {
            const arr = [50,30,70,20,40,60,80];
            const noChildTree = new Tree(arr);
            for (let i = 0; i < arr.length; ++i) expect(noChildTree.includes(arr[i])).toBe(true);

            const valueToRemove = arr[3];
            noChildTree.deleteItem(valueToRemove);
            expect(noChildTree.includes(valueToRemove)).toBe(false);

            const newArr = arr.filter(item => item !== valueToRemove);
            for (let i = 0; i < newArr.length; ++i) expect(noChildTree.includes(newArr[i])).toBe(true);
        });
        test('deleted node has 1 child', () => {
            const arr = [50,30,70,20,40,60];
            const oneChildTree = new Tree(arr);
            for (let i = 0; i < arr.length; ++i) expect(oneChildTree.includes(arr[i])).toBe(true);

            const valueToRemove = arr[2];
            oneChildTree.deleteItem(valueToRemove);
            expect(oneChildTree.includes(valueToRemove)).toBe(false);

            const newArr = arr.filter(item => item !== valueToRemove);
            for (let i = 0; i < newArr.length; ++i) expect(oneChildTree.includes(newArr[i])).toBe(true);
        });
        test('deleted node has 2 children, or is the root node', () => {
            const arr = [50,30,70,20,40,60,80];
            const twoChildTree = new Tree(arr);
            for (let i = 0; i < arr.length; ++i) expect(twoChildTree.includes(arr[i])).toBe(true);
            expect(twoChildTree.root.value).toBe(50);

            const valueToRemove = arr[0];
            twoChildTree.deleteItem(valueToRemove);
            expect(twoChildTree.includes(valueToRemove)).toBe(false);
            expect(twoChildTree.root.value).toBe(60);

            const newArr = arr.filter(item => item !== valueToRemove);
            for (let i = 0; i < newArr.length; ++i) expect(twoChildTree.includes(newArr[i])).toBe(true);
        });
    });
});