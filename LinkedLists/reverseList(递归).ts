import { ListNode } from "./IListNode";
function reverseList(head: ListNode | null): ListNode | null {
  // 结束递归的条件
  if (head === null || head.next === null) return head; // return head 可以拿到最后一个节点
  const newHead = reverseList(head?.next ?? null);
  // 在这个位置的代码是已经结束递归了
  // 第一次执行这里的代码，一定是倒数第二个节点
  // 此时，head指向倒数第二个节点
  head.next.next = head;
  head.next = null; // 解决循环引用

  return newHead;
}

//
