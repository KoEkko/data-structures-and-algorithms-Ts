import { IList } from "../Types/IList"

export interface IStack<T>  extends IList<T>{
  push(element:T): void
  pop():T | undefined
}