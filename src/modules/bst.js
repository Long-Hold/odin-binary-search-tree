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

    /**
     * Traverses the Binary Search Tree using a form of Binary Search to locate the passed value.
     * If the passed value is found, returns true or otherwise false.
     * 
     * @param {number} value - The value of the node to search for in the BST. 
     * @returns {boolean} Returns true if value found, returns false if not.
     */
    includes(value) {
        function findValue(value, currentNode) {
            if (currentNode === null) return false;
            if (value === currentNode.value) return true;

            const nextNode = (value > currentNode.value) ? currentNode.right : currentNode.left;
            return findValue(value, nextNode);
        }

        return findValue(value, this.root);
    }

    /**
     * Inserts a new value into the BST by recursively finding an empty space that maintains
     * the BST principal.
     * 
     * Duplicate value insertions are ignored.
     * 
     * @param {number} value - The value to insert into the BST 
     * @returns {this} An instance of the object for chaining.
     */
    insert(value) {
        if (this.includes(value)) return this;
        function appendToBranchEnd(value, currentNode) {
            if (currentNode === null) return new Node(value);
            if (value > currentNode.value) currentNode.right = appendToBranchEnd(value, currentNode.right);
            else currentNode.left = appendToBranchEnd(value, currentNode.left);

            return currentNode;
        }

        appendToBranchEnd(value, this.root);
        return this;
    }

    /**
     * Deletes the Node with the specified value from the tree, if the value does not
     * exist within the tree, then nothing happens.
     * 
     * @param {number} value - The value of the node to delete. 
     * @returns {this} An insstance of the object for chaining.
     */
    deleteItem(value) {
        // Return early if the value doesn't exist at all
        if (!this.includes(value)) return this;
        function getSuccessor(currentNode) {
            currentNode = currentNode.right;
            while (currentNode !== null && currentNode.left !== null) 
                currentNode = currentNode.left;
            return currentNode;
        }

        function deleteNode(currentNode, value) {
            if (currentNode === null) return currentNode;

            if (value < currentNode.value) currentNode.left = deleteNode(currentNode.left, value);
            else if (value > currentNode.value) currentNode.right = deleteNode(currentNode.right, value);
            else {
                // Node with 0 or 1 child
                if (currentNode.left === null) return currentNode.right;
                if (currentNode.right === null) return currentNode.left;

                // Node with 2 children
                const sucessor = getSuccessor(currentNode);
                currentNode.value = sucessor.value;
                currentNode.right = deleteNode(currentNode.right, sucessor.value);
            }

            return currentNode;
        }

        deleteNode(this.root, value);
        return this;
    }

    levelOrderForEach(callBack) {
        
    }
}