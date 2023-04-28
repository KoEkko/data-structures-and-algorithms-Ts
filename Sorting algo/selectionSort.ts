import { measureSortPerformance, swap, testSort } from "./utils";

function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 只有不相等时才交换
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }
  return arr;
}

// testSort(selectionSort)
measureSortPerformance(selectionSort, 100000);
