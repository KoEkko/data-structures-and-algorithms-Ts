import { IList } from "../Types/IList";

export interface IQueue<T> extends IList<T> {
  dequeue():T | undefined
  enqueue(element:T): void
}