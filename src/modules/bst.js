class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

export class Tree {
    constructor(numArray) {
        this.root = this.#buildTree(numArray);
    }

    /**
     * Recursively constructs a balanced Binary Search Tree, omitting any duplicate values
     * in the passed array.
     * 
     * @param {number[]} numArray - An array of numbers to be converted into a BST.
     * @returns {Node | null} The root Node of the BST or null if there is none.
     */
    #buildTree(numArray) {
        const uniqueNumbers = new Set(numArray);
        const sortedArray = [...uniqueNumbers].sort((a, b) => a - b);

        function arrayToBST(arr, start, end) {
            if (start > end) return null;

            let mid = start + Math.floor((end - start) / 2);
            let root = new Node(arr[mid]);

            root.left = arrayToBST(arr, start, mid - 1);
            root.right = arrayToBST(arr, mid + 1, end);

            return root;
        }

        return arrayToBST(sortedArray, 0, sortedArray.length - 1);
    }

    includes(value) {
        if (value === this.root.value) return true;
    }
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);