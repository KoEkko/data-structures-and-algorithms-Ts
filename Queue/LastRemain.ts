import { ArrayQueue } from "./Queue"

function lastRemain(n:number, m:number) :number {
  const queue = new ArrayQueue<number>() 
  for (let i = 0 ; i < n ; i++) {
    queue.enqueue(i)
  }
  while(queue.size() > 1 ) {
    for(let i = 1; i < m ; i++) {
      queue.enqueue(queue.dequeue()!)
    }
    queue.dequeue()
  }

  return queue.dequeue()!
}


console.log(lastRemain(5,3)); // 3
console.log(lastRemain(10,17)); //2