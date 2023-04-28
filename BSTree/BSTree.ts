import { ITree } from "../Types/ITree";

import { btPrint } from "hy-algokit";

export class TreeNode<T> extends ITree<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  parent: TreeNode<T> | null = null;

  get isLeft() {
    return !!(this.parent && this.parent.left === this);
  }

  get isRight() {
    return !!(this.parent && this.parent.right === this);
  }
}

export class BSTree<T> {
  protected root: TreeNode<T> | null = null;

  private insertNode(nextNode: TreeNode<T>, newNode: TreeNode<T>) {
    const newNodeValue = newNode.value; // 要插入节点的值
    const nextNodeValue = nextNode?.value; // 当前节点的值
    if (newNodeValue < nextNodeValue) {
      if (nextNode.left === null) {
        nextNode.left = newNode;
        newNode.parent = nextNode
      } else {
        this.insertNode(nextNode.left!, newNode);
      }
    } else {
      if (newNodeValue > nextNodeValue) {
        if (nextNode.right === null) {
          nextNode.right = newNode;
          newNode.parent = nextNode
        } else {
          this.insertNode(nextNode.right!, newNode);
        }
      }
    }
  }

  print() {
    btPrint(this.root);
  }

  protected createNode(value:T):TreeNode<T> {
    return new TreeNode(value)
  }
  
  protected checkBalance(node:TreeNode<T>, isAdd = true) {}
  // insert
  insert(value: T) {
    const newNode = this.createNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }

    // 检测树是否平衡
    this.checkBalance(newNode)
  }

  // 先序遍历
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }
  private preOrderTraverseNode(root: TreeNode<T> | null) {
    if (root) {
      console.log(root.value);
      this.preOrderTraverseNode(root.left);
      this.preOrderTraverseNode(root.right);
    }
  }
  // 中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }
  private inOrderTraverseNode(root: TreeNode<T> | null) {
    if (root) {
      this.inOrderTraverseNode(root.left);
      console.log(root.value);
      this.inOrderTraverseNode(root.right);
    }
  }
  // 后序遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }
  private postOrderTraverseNode(root: TreeNode<T> | null) {
    if (root) {
      this.postOrderTraverseNode(root.left);
      this.postOrderTraverseNode(root.right);
      console.log(root.value);
    }
  }
  // 层序遍历
  levelOrderTraverse() {
    if (!this.root) return;
    const queue: TreeNode<T>[] = [];
    queue.push(this.root);

    while (queue.length) {
      const current = queue.shift()!;
      console.log(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  // getMaxValue
  getMaxValue(): T | null {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value ?? null;
  }

  // getMinValue
  getMinValue(): T | null {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value ?? null;
  }

  // search
  search(value: T): boolean {
    let current = this.root;
    while (current) {
      if (current.value === value) return true;
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return false;
  }

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      if (current.value === value) return current;
      parent = current;
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
      if (current) {
        current.parent = parent;
      }
    }
    return null;
  }

  // remove
  remove(value: T): boolean {
    const current = this.searchNode(value);
    if (!current) return false;

    // 取代的节点
    let replaceNode: TreeNode<T> | null = null
    let delNode: TreeNode<T> | null = null
    delNode = current
    // 如果删除的是叶子节点
    if(current.left === null && current.right === null) {
      replaceNode = null 
    }

    // 如果删除的节点只有一个左节点
    else if(current.right === null ) {
      replaceNode = current.left
    }

    // 如果删除的节点只有一个右节点
    else if(current.left === null ) {
      replaceNode = current.right
    }

    // 都不是的情况下，就是删除左右都有节点的情况
    else {
      // 找到后继节点
      const successor = this.getSuccessor(current)
      current.value = successor!.value
      delNode = successor
      this.checkBalance(delNode!,false)
      return true
    }

    if(current === this.root) {
      this.root = replaceNode
    } else if(current.isLeft) {
      current.parent!.left = replaceNode
    } else {
      current.parent!.right = replaceNode
    }

    // 判断replaceNode
    if(replaceNode && current.parent) {
      replaceNode.parent = current.parent
    }
    // 检测平衡
    this.checkBalance(delNode!, false)
    return true;
  }
  private getSuccessor(delNode:TreeNode<T>):TreeNode<T> | null {
    // 后继节点就是右子树中最小的节点
    let current = delNode.right
    // 后继节点
    let successor:TreeNode<T> | null = null 
    while(current) {
      successor = current
      current = current.left
      if(current) {
        current.parent = successor
      }
    }

    // 拿到了后继节点
    // 有一种情况，当后继节点刚好是删除节点的右节点,就不用执行以下的操作
    if(successor !== delNode.right) {
      successor!.parent!.left =  successor!.right 
      if(successor?.right) {
        successor.right.parent = successor.parent
      }
    } else {
      delNode.right = successor!.right
      if(successor!.right) {
        successor!.right!.parent = delNode
      }
    }

    // 后继节点的左子树一定为空
    // successor!.left = delNode.left
    
    return successor
  }
  
}

// const bst = new BSTree<number>();
// bst.insert(10);
// bst.insert(20);
// bst.insert(7);
// bst.insert(5);
// bst.insert(11);
// bst.insert(8);
// bst.insert(22);

// // bst.preOrderTraverse()

// // bst.inOrderTraverse()

// // bst.postOrderTraverse()
// // bst.levelOrderTraverse()

// // console.log(bst.getMaxValue());
// // console.log(bst.getMinValue());

// // console.log(bst.search(20));
// // console.log(bst.search(8));
// // console.log(bst.search(6));

// bst.remove(20)
// // bst.print();

export {};
