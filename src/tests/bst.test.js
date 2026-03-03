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
    });
});