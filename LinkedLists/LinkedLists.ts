class ListNode <T> {
  value: T 
  next: ListNode<T> | null = null
  constructor(value:T) {
    this.value = value
  }
}

class LinkedLists<T> {
  private head: ListNode<T> | null = null
  private size: number = 0
  
  // append 链表尾部追加元素
  append(value:T) {
    const newVNode = new ListNode<T>(value)
    
    if(!this.head) {
      this.head = newVNode
    } else {
      // 找到链表的最后一个元素
      let current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = newVNode
    }
    this.size++
  }

  // traverse遍历
  traverse() {
    let current = this.head
    const values: T[] = []
    while(current) {
      values.push(current.value)
      current = current.next
    }
    console.log(values.join("-> "));
  }

  // insert 插入
  insert(value:T,position:number):boolean {
    // 1.越界的判断
    if(position < 0 || position > this.size ) return false
    

    
    return true
  }
}

const linkedlist = new LinkedLists<string>()
linkedlist.append("aaa")
linkedlist.append("bbb")
linkedlist.append("ddd")
linkedlist.append("ccc")

linkedlist.traverse()
export {}