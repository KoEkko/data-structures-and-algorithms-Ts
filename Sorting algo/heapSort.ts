import { measureSortPerformance, swap, testSort } from './utils'

function heapSort(arr: number[]): number[] {
  const n = arr.length;
  // 1.对arr进行原地建堆
  // 1.1 从第一个非叶子结点开始进行下滤操作
  const start = Math.floor(n / 2 - 1);
  for(let i = start; i >= 0 ; i--) {
    heapifyDown(arr,n,i)
  }
  // 1.2对最大堆进行排序
  for(let i = n -1; i> 0 ; i--) {
    swap(arr,0,i)
    heapifyDown(arr,i,0)
  }
  return arr;
}

/**
 * 下滤操作
 * @param arr 原地建堆的数组
 * @param n 原地建堆的范围
 * @param index 建堆的索引
 */
function heapifyDown(arr:number[],n:number,index:number) {
  while(2 * index + 1 < n) {
    const leftIndex = 2 * index + 1
    const rightIndex = 2 * index + 2
    let largerIndex = leftIndex
    if(rightIndex < n && arr[rightIndex] > arr[leftIndex]) {
      largerIndex = rightIndex
    }

    if(arr[index] > arr[largerIndex]) break
    swap(arr,index,largerIndex)
    index = largerIndex
  }
}

// testSort(heapSort)
measureSortPerformance(heapSort,100000)

