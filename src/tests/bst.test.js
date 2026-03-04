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
        test('inserts a value into the tree on the left and right of a node', () => {
            const arr = [22,12,30,8,20,30];
            const newTree = new Tree(arr);
            for (let i = 0; i < arr.length; ++i) expect(newTree.includes(arr[i])).toBe(true);
            newTree.insert(15);
            newTree.insert(17);
            expect(newTree.includes(15)).toBe(true);
            expect(newTree.includes(17)).toBe(true);
            for (let i = 0; i < arr.length; ++i) expect(newTree.includes(arr[i])).toBe(true);
        });
        test('does not insert a duplicate value into the tree', () => {
            function mapBST(valuesArr, root) {
                function traverse(root) {
                    if (root) {
                        traverse(root.left);
                        valuesArr.push(root.value);
                        traverse(root.right);
                    }
                }
                traverse(root);
            }
            const initialList = [];
            mapBST(initialList, tree.root);
            expect(initialList.length).not.toBe(0);
            initialList.forEach(val => expect(tree.includes(val)).toBe(true));


            tree.insert(startingArray[0]);
            tree.insert(startingArray[4]);
            tree.insert(startingArray[1]);
            const duplicateList = [];
            mapBST(duplicateList, tree.root);
            expect(duplicateList.length).not.toBe(0);

            // They should be the same length if the method rejects duplicate valuess
            expect(duplicateList.length).toBe(initialList.length);
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
        test('does nothing if the value does not exist, and tree remains unchanged', () => {
            const uniqueNumbers = new Set(startingArray);
            for (const value of uniqueNumbers) expect(tree.includes(value)).toBe(true);

            tree.deleteItem(123123);
            for (const value of uniqueNumbers) expect(tree.includes(value)).toBe(true);
        });
    });
    describe('Tree.levelOrderForEach()', () => {
        test('throws an Error when no callback is provided', () => {
            expect(() => tree.levelOrderForEach()).toThrow();
        });
        test.each([
            1, [], 'name', {}
        ])('throws TypeError when passed "%s" to callBack parameter', (input) => {
            expect(() => tree.levelOrderForEach(input)).toThrow(TypeError);
        });
        test('calls callback with values, not Node objects', () => {
            const callback = jest.fn();
            tree.levelOrderForEach(callback);

            callback.mock.calls.forEach(([arg]) => {
                expect(typeof arg).toBe('number'); // or whatever your value type is
            });
        });
        test('traverses in level-order (BFS)', () => {
            const simpleArr = [4, 2, 6, 1, 3, 5, 7];
            const simpleTree = new Tree(simpleArr);
            //       4
            //      / \
            //     2   6
            //    / \ / \
            //   1  3 5  7

            const received = [];
            simpleTree.levelOrderForEach(val => received.push(val));

            expect(received).toEqual([4, 2, 6, 1, 3, 5, 7]);
        });
        test('calls callback exactly once per unique node', () => {
            const callback = jest.fn();
            tree.levelOrderForEach(callback);

            const uniqueValues = new Set(startingArray);
            expect(callback).toHaveBeenCalledTimes(uniqueValues.size);
        });
    });
    describe('Tree.inOrderForEach()', () => {
        test('throws an Error when no callback is provided', () => {
            expect(() => tree.inOrderForEach()).toThrow();
        });
        test.each([
            1, [], 'name', {}
        ])('throws TypeError when passed "%s" to callBack parameter', (input) => {
            expect(() => tree.inOrderForEach(input)).toThrow(TypeError);
        });
        test('traverses in ascending sorted order', () => {
            const received = [];
            tree.inOrderForEach(val => received.push(val));

            const sorted = [...new Set(startingArray)].sort((a, b) => a - b);
            expect(received).toEqual(sorted);
        });
        test('calls callback with values, not Node objects', () => {
            const callback = jest.fn();
            tree.inOrderForEach(callback);

            callback.mock.calls.forEach(([arg]) => {
                expect(typeof arg).toBe('number');
            });
        });
        test('calls callback exactly once per unique node', () => {
            const callback = jest.fn();
            tree.inOrderForEach(callback);

            const uniqueValues = new Set(startingArray);
            expect(callback).toHaveBeenCalledTimes(uniqueValues.size);
        });
    });
    describe('Tree.preOrderForEach()', () => {
        test('throws an Error when no callback is provided', () => {
            expect(() => tree.preOrderForEach()).toThrow();
        });
        test.each([
            1, [], 'name', {}
        ])('throws TypeError when passed "%s" to callBack parameter', (input) => {
            expect(() => tree.preOrderForEach(input)).toThrow(TypeError);
        });
        test('calls callback with values, not Node objects', () => {
            const callback = jest.fn();
            tree.preOrderForEach(callback);

            callback.mock.calls.forEach(([arg]) => {
                expect(typeof arg).toBe('number');
            });
        });
        test('calls callback exactly once per unique node', () => {
            const callback = jest.fn();
            tree.preOrderForEach(callback);

            const uniqueValues = new Set(startingArray);
            expect(callback).toHaveBeenCalledTimes(uniqueValues.size);
        });
        test('traverses in pre-order (root, left subtree, right subtree)', () => {
            const simpleArr = [4, 2, 6, 1, 3, 5, 7];
            const simpleTree = new Tree(simpleArr);
            //       4
            //      / \
            //     2   6
            //    / \ / \
            //   1  3 5  7

            const received = [];
            simpleTree.preOrderForEach(val => received.push(val));

            expect(received).toEqual([4, 2, 1, 3, 6, 5, 7]);
        });
    });
    describe('Tree.postOrderForEach()', () => {
        test('throws an Error when no callback is provided', () => {
            expect(() => tree.postOrderForEach()).toThrow();
        });
        test.each([
            1, [], 'name', {}
        ])('throws TypeError when passed "%s" to callBack parameter', (input) => {
            expect(() => tree.postOrderForEach(input)).toThrow(TypeError);
        });
        test('calls callback with values, not Node objects', () => {
            const callback = jest.fn();
            tree.postOrderForEach(callback);

            callback.mock.calls.forEach(([arg]) => {
                expect(typeof arg).toBe('number');
            });
        });
        test('calls callback exactly once per unique node', () => {
            const callback = jest.fn();
            tree.postOrderForEach(callback);

            const uniqueValues = new Set(startingArray);
            expect(callback).toHaveBeenCalledTimes(uniqueValues.size);
        });
        test('traverses in post-order (left subtree, right subtree, root)', () => {
            const simpleArr = [4, 2, 6, 1, 3, 5, 7];
            const simpleTree = new Tree(simpleArr);
            //       4
            //      / \
            //     2   6
            //    / \ / \
            //   1  3 5  7

            const received = [];
            simpleTree.postOrderForEach(val => received.push(val));

            expect(received).toEqual([1, 3, 2, 5, 7, 6, 4]);
        });
    });
    describe('Tree.height()', () => {
        test('returns undefined if the value does not exist in the tree', () => {
            expect(tree.height(9999)).toBe(undefined);
            expect(tree.height(12312)).toBe(undefined);
        });
        test('returns expected height of 3 for root node', () => {
            expect(tree.height(8)).toBe(3);
        });
        test.each([
            { input: 3,   result: 0 },
            { input: 4,   result: 2 },
            { input: 324, result: 1 },
            { input: 23,  result: 0 },
            { input: 67,  result: 2 },
        ])('returns height $result for value $input', ({ input, result }) => {
            expect(tree.height(input)).toBe(result);
        });
        test('returns correct height after inserting a new deepest node', () => {
            // 8 currently has height 3, its deepest path ends at 3
            // inserting 2 extends that path: 8 → 4 → 1 → 3 → 2
            tree.insert(2);
            expect(tree.height(8)).toBe(4);
        });
        test('returns correct height after deleting a node', () => {
            // 4 currently has height 2 (4 → 1 → 3)
            // deleting 3 reduces it: 4 → 1
            tree.deleteItem(3);
            tree.deleteItem(7);
            expect(tree.height(4)).toBe(1);
        });
    });
    describe('Tree.depth()', () => {
        test('returns undefined for a value that does not exist', () => {
            expect(tree.depth(9999)).toBe(undefined);
            tree.deleteItem(4);
            expect(tree.depth(4)).toBe(undefined);
        });
        test.each([
            {input: 8, result: 0},
            {input: 7, result: 3},
            {input: 1, result: 2},
            {input: 9, result: 2},
            {input: 6345, result: 3},
        ])('returns $result when passed $input', ({input, result}) => {
            expect(tree.depth(input)).toBe(result);
        })
    });
});