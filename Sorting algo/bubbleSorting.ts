import { swap, testSort,measureSortPerformance } from "./utils";

function bubbleSorting(arr: number[]): number[] {
  const length = arr.length;
  let isSwapped = false
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isSwapped = true
      }
    }
    if(!isSwapped) break
  }
  return arr;
}


// testSort(bubbleSorting)
measureSortPerformance(bubbleSorting, 100000)