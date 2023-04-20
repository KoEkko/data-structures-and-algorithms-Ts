import { ArrayQueue } from "./Queue";

function hotPotaop(arr: string[], index: number): number {
  if(arr.length === 0 ) return -1
  // 1.创建队列
  const queue = new ArrayQueue<string>();

  // 2.所有元素入队
  for (const item of arr) {
    queue.enqueue(item);
  }

  while (queue.size() > 1) {
    // 3.淘汰规则
    // 1-> 在index 之前的先出队，再入队，不需要淘汰
    for (let i = 1; i < index; i++) {
      const name = queue.dequeue();
      if (name) queue.enqueue(name);
    }
    // 2-> 刚好是index的直接出队
    queue.dequeue();
  }
  // 4.取出最后一个人
  const lastName = queue.dequeue()!
  const lastIndex = arr.indexOf(lastName)
  return lastIndex;
}

const lastIndex = hotPotaop(["why","kobe","james","curry"],3)
console.log(lastIndex);
