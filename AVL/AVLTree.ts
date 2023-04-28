import { BSTree, TreeNode } from "../BSTree/BSTree";
import { AVLTreeNode } from "./AVLTreeNode";

class AVLTree<T> extends BSTree<T> {
  
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value)
  }
  
  protected checkBalance(node: AVLTreeNode<T>, isAdd = true): void {
    let current = node.parent as AVLTreeNode<T>
    while(current) {
      if(!current.isBalanced) {
        this.rebalance(current)
        if(isAdd) break
      } 
      current = current.parent as AVLTreeNode<T>
    }
  }

  /**
   * 根据不平衡的节点的情况（LL/LR/RR/RL）让子树平衡
   * @param root 找到的不平衡的节点
   */
  rebalance(root: AVLTreeNode<T>) {
    const pivot = root.higherChildNode
    const current = pivot?.higherChildNode

    let resultNode: AVLTreeNode<T> | null  = null
    if(pivot?.isLeft) { // L
      if(current?.isLeft) { // LL
        resultNode = root.rightRotation()
      } else if(current?.isRight){ // LR
        pivot.leftRotation()
        resultNode = root.rightRotation()
      }
    } else { // R
      if(current?.isLeft) { // RL
        pivot?.rightRotation()
        resultNode = root.leftRotation()
      } else if(current?.isRight) { // RR
        resultNode = root.leftRotation()
      }
    }
    if(!resultNode?.parent) {
      this.root = resultNode
    }
  }


}

const avltree = new AVLTree<number>()
const delNums: number[] = []
for(let i = 0; i < 20; i++) {
  const randomNum = Math.floor(Math.random() * 200 )
  if( i % 2=== 0 && delNums.length < 6) {
    delNums.push(randomNum)
  }
  avltree.insert(randomNum)
}
avltree.print()
for(const delnum of delNums) {
  avltree.remove(delnum)
}


avltree.print()