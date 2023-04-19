export interface IStack<T> {
  push(element:T): void
  pop():T | undefined
  isEmpty():boolean
  peek():T | undefined
  size():number
}