import { IStack } from "./IStack"

// 1.封装一个栈
export class ArrayStack<T = any> implements IStack<T> {
  private data: T[] = []

  push(element:T):void {
    this.data.push(element)
  }

  pop():T | undefined {
    return this.data.pop()
  }

  peek():T | undefined {
    return this.data[this.data.length - 1]
  }

  isEmpty() {
    return this.data.length === 0
  }

  size() {
    return this.data.length
  }
}

// 2.创建一个栈的实例
const stack1 = new ArrayStack<string>()

stack1.push("aaa")
stack1.push("bbb")
stack1.push("ccc")
stack1.push("ddd")

stack1.isEmpty()

const res = stack1.peek()

stack1.pop()
stack1.pop()
stack1.pop()
stack1.pop()

stack1.isEmpty()
stack1.size()