import { BSTree } from "../BSTree/BSTree";
import { AVLTreeNode } from "./AVLTreeNode";

class AVLTree<T> extends BSTree<T> {
  
  
  /**
   * 根据不平衡的
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