class Heap<T> {
  // 属性
  data: T[] = [];
  private length: number = 0;

  // 私有工具方法
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  insert(value: T) {
    // 1.将元素放到数组的尾部
    this.data.push(value);
    this.length++;

    // 2.维护最大堆的特性（最后位置的元素需要进行上滤操作）
    this.heapify_up();
  }

  private heapify_up() {
    let index = this.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.data[parentIndex] >= this.data[index]) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // 提取操作
  extract(): T | undefined {
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      return this.data.pop();
    }

    // 取出最大堆中的最大元素
    const topValue = this.data[0];

    // 让data的尾部元素取代index = 0 的位置
    this.data[0] = this.data.pop()!;
    this.length--;

    // 开始下滤操作：维护最大堆的特性
    this.hepify_down()
    return topValue;
  }

  private hepify_down() {
    //
    let index = 0;
    // 有左子节点的情况才继续循环
    while (2 * index + 1 < this.length) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;
      let largerIndex = leftChildIndex;
      // 有右子节点且 右子节点的值大于左子节点
      if (
        rightChildIndex < this.length &&
        this.data[rightChildIndex] > this.data[leftChildIndex]
      ) {
        largerIndex = rightChildIndex;
      }
      // 如果index 的值大于largerIndex 的值，说明已经是最大堆了
      if (this.data[index] >= this.data[largerIndex]) break;
      // 交换位置
      this.swap(index, largerIndex);
      index = largerIndex;
    }
  }
  peek(): T | undefined {
    return this.data[0];
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  buildHeap(arr: T[]) {}
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];

const heap = new Heap<number>();
for (const i of arr) {
  heap.insert(i);
}
console.log(heap.data);
heap.insert(133)
console.log(heap.data);

console.log(heap.extract());
