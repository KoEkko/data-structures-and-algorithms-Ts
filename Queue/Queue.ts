import { IQueue } from "./IQueue";

export class ArrayQueue<T> implements IQueue<T>{
  private data: T[] = []
  dequeue(): T | undefined {
    return this.data.shift()
  }
  enqueue(element: T): void {
    this.data.push(element)
  }
  peek(): T | undefined {
    return this.data[0]
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
  size(): number {
    return this.data.length
  }
}