import { IList } from "../Types/IList";
import { Node } from "./LinkedLists";

export interface ILinkedLists<T> extends IList<T> {
  update(value:T,position:number):boolean
  append(value:T):void
  removeAt(position:number):boolean
  remove(value:T):boolean
  get(position:number): T | null
  indexOf(value:T):number
  traverse():void
  insert(value:T,position:number):boolean
}