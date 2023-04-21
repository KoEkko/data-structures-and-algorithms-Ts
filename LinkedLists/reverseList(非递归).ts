import { ListNode } from "./IListNode";
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  let newHead: ListNode | null = null;

  /**
   * 1.让current指向head的下一个节点，目的是为了保存引用，防止被销毁
   * 2.让head的next指向newHead
   * 3.newHead指向head
   * 4.head指向current
   */
  while (head) {
    let current:ListNode | null = head.next;
    head.next = newHead;
    newHead = head;
    head = current;
  }
  return newHead;
}

// 