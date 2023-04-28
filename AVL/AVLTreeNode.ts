import { TreeNode } from "../BSTree/BSTree";
import { btPrint } from 'hy-algokit'
export class AVLTreeNode<T> extends TreeNode<T> {
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

  /** 旋转情况 */
  
  // 1.LL 右旋转
  rightRotation() {
    // 提前准备好当前this是在left还是right
    // 因为下面会修改到this.parent的值
    const isLeft = this.isLeft
    const isRight = this.isRight

    // 1.处理pivot节点
    const pivot = this.left!
    pivot.parent = this.parent
    
    // 2.处理pivot节点的右节点
    this.left = pivot.right
    if(pivot.right) {
      pivot.right.parent = this
    }
    
    // 3.处理this节点
    pivot.right = this
    this.parent = pivot

    // 4.挂载pivot节点
    if(!pivot.parent) { // pivot直接作为tree的根
      return pivot
    } else if(isLeft) { // pivot作为父节点的左子节点
      pivot.parent.left = pivot
    } else if(isRight) { // pivot作为父节点的右子节点
      pivot.parent.right = pivot
    }

    return pivot
  }

  // 2.RR 左旋转
  leftRotation() {
    const isLeft = this.isLeft
    const isRight = this.isRight

    // 1.处理pivot
    const pivot = this.right!
    pivot.parent = this.parent
    
    // 2.处理pivot的左节点
    this.right = pivot.left
    if(pivot.left) {
      pivot.left.parent = this
    }

    // 3.处理this
    pivot.left = this
    this.parent = pivot

    // 4.挂载pivot
    if(!pivot.parent) {
      return pivot
    } else if(isLeft) {
      pivot.parent.left = pivot
    } else if(isRight) {
      pivot.parent.right = pivot
    }
    return pivot
  }
}


// const avltreenode1 = new AVLTreeNode(5)
// avltreenode1.left = new AVLTreeNode(3)
// avltreenode1.left.parent = avltreenode1
// avltreenode1.left.left = new AVLTreeNode(2)
// avltreenode1.left.left.parent = avltreenode1.left

// const parent = new AVLTreeNode(12)
// parent.left = avltreenode1

// avltreenode1.parent = parent
// btPrint(parent)

// avltreenode1.rightRotation()
// btPrint(parent)