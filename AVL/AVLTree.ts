import { TreeNode } from "../BSTree/BSTree";

class AVLTreeNode<T> extends TreeNode<T> {
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null

  // 获取当前节点的高度
  private getHeight():number {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0
    return Math.max(leftHeight,rightHeight) + 1
  }

  // 获取当前节点的平衡因子
  private getBanlanceFactor():number {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0
    return leftHeight - rightHeight
  }

  get isBalanced():boolean {
    return Math.abs(this.getBanlanceFactor()) <= 1
  }

  // 获取更高子节点
  public get higherChildNode(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.getHeight() : 0
    const rightHeight = this.right ? this.getHeight() : 0
    if(leftHeight > rightHeight ) return this.left
    if(rightHeight > leftHeight ) return this.right
    return this.isLeft ? this.left : this.right
  }
  
}



const avltreenode1 = new AVLTreeNode(2)
avltreenode1.right = new AVLTreeNode(3)
avltreenode1.left = new AVLTreeNode(3)
avltreenode1.right.right = new AVLTreeNode(1)

console.log(avltreenode1.isBalanced);
