import LinkedList from "../Basic_LinkedLists/LinkedLists";
import { DoublyNode } from "./LinkedNode";

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null;

  append(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  postTraverse() {
    let current = this.tail;
    const values: T[] = [];
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
    console.log(values.join("-> "));
  }

  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.size) {
      console.warn(
        `插入的位置${position}超过了链表的长度, 当前链表的长度为${this.size} , 请重新选择插入的位置~`
      );
      return false;
    }
    if (position === 0) {
      this.prepend(value);
    } else if (position === this.size) {
      this.append(value);
    } else {
      const newNode = new DoublyNode(value);
      let current = this.getNode(position) as DoublyNode<T>;
      current.prev!.next = newNode;
      newNode.prev = current!.prev;
      current!.prev = newNode;
      newNode.next = current;
      this.size++;
    }
    return true;
  }

  removeAt(position: number): boolean {
    if(position < 0 || position >= this.size) return false
    if( position === 0 ){
      if(this.size === 1) {
        this.tail = null
        this.head = null
      } else {
        this.head = this.head!.next
        this.head!.prev = null
      }
    } else if (position === this.size - 1) {
      this.tail = this.tail!.prev
      this.tail!.next = null
    } else {
      const currentNode = this.getNode(position) as DoublyNode<T>
      currentNode.prev!.next = currentNode.next
      currentNode.next!.prev = currentNode.prev 
    }
    this.size--
    return true
  }
}

const dLinkedList = new DoublyLinkedList<string>();
console.log("----------------- append -----------------");
dLinkedList.append("aaa");
dLinkedList.append("bbb");
dLinkedList.append("ccc");
dLinkedList.append("ddd");
dLinkedList.traverse();

console.log("----------------- prepend -----------------");
dLinkedList.prepend("qqq");

dLinkedList.traverse();

console.log("----------------- postTraverse -----------------");
dLinkedList.postTraverse();

console.log("----------------- insert -----------------");
dLinkedList.insert("why", 0);
dLinkedList.insert("kobe", 6);
dLinkedList.insert("james", 3);
dLinkedList.traverse();
