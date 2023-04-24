import LinkedList from "../Basic_LinkedLists/LinkedLists";

class CircularLinkedList<T> extends LinkedList<T> {
  append(value: T): void {
    super.append(value);
    this.tail!.next = this.head;
  }

  insert(value: T, position: number): boolean {
    const isSuccess = super.insert(value, position);
    // 如果插入的是尾部或者头部
    // 因为调用了super方法，就已经执行了insert方法了, 执行完size已经++了
    // 所以要判断插入的位置是否是最后一个，需要将size - 1
    if (isSuccess && (position === this.size - 1 || position === 0)) {
      this.tail!.next = this.head;
    }
    return isSuccess;
  }

  removeAt(position: number): boolean {
    const isSuccess = super.removeAt(position)
    // 同理, 调用完super，size已经--
    // 是否删除的最后一个元素, position === this.size
    if(isSuccess && this.tail && (position === 0 || position === this.size)) {
      this.tail.next = this.head
    }
    return isSuccess
  }
}

const clinkedlist = new CircularLinkedList<string>();
clinkedlist.append("aaa");
clinkedlist.append("bbb");
clinkedlist.append("ccc");
clinkedlist.append("ddd");
clinkedlist.traverse();

clinkedlist.removeAt(0)
clinkedlist.removeAt(2)

clinkedlist.traverse();

export {};
