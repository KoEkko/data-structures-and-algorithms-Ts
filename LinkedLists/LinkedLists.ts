import { ILinkedLists } from "./ILinkedLists";

class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> implements ILinkedLists<T>{
  private size = 0;
  private head: Node<T> | null = null;

  // 私有方法
  getNode(position: number): Node<T> | null {
    let index = 0;
    let current = this.head;
    while (index++ < position) {
      current = current?.next ?? null;
    }
    return current;
  }
  peek() {
    return this.head?.value
  }

  // 1.append在链表尾部增加元素
  append(value: T): void {
    const newNode = new Node<T>(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // 2.traverse遍历链表
  traverse() {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join("-> "));
  }

  // 3.insert插入
  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node<T>(value);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const prevNode = this.getNode(position - 1);
      newNode.next = prevNode!.next;
      prevNode!.next = newNode;
    }
    this.size++;
    return true;
  }
  // 4.removeAt
  removeAt(position: number): boolean {
    if (position < 0 || position >= this.size) return false;
    if (position === 0) {
      this.head = this.head!.next;
    } else {
      const prevNode = this.getNode(position - 1);
      prevNode!.next = prevNode!.next!.next;
    }
    this.size--;
    return true;
  }

  // 5.get
  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null;
    const current = this.getNode(position);
    return current!.value;
  }
  // 6.indexOf
  indexOf(value: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }
  // 7.remove
  remove(value: T): boolean {
    const index = this.indexOf(value);
    if (index === 0) {
      this.head = this.head?.next ?? null;
    } else if (index > 0) {
      const prevNode = this.getNode(index - 1);
      prevNode!.next = prevNode!.next!.next;
      return true;
    }
    this.size--
    return false;
  }
  // 8.update
  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.size) return false;
    const currentNode = this.getNode(position);
    currentNode!.value = value;
    return true;
  }
  // 9.isEmpty
  isEmpty():boolean {
    if(this.size === 0 ) return true
    return false
  }
}

const linkedlist = new LinkedList<string>();

// test append
linkedlist.append("aaa");
linkedlist.append("bbb");
linkedlist.append("ccc");
linkedlist.traverse();

// test insert
linkedlist.insert("ddd", 0);
linkedlist.insert("eee", 2);
linkedlist.insert("fff", 3);
linkedlist.traverse();

// test removeAt
linkedlist.removeAt(0);
linkedlist.removeAt(2);

linkedlist.traverse();

// test get
console.log(linkedlist.get(0));

// test remove
linkedlist.remove("aaa");
linkedlist.traverse();

// test update
linkedlist.update("abc", 0);
linkedlist.traverse();

export {};
