import { ArrayQueue } from "../Queue/Queue";

class ArrayDeQue<T> extends ArrayQueue<T> {
  addFront(value:T) {
    this.data.unshift(value)
  }

  removeBack(): T | undefined {
    return this.data.pop()
  }
}