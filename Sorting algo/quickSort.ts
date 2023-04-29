import { measureSortPerformance, swap, testSort } from "./utils";

function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);

  function partition(left: number, right: number) {
    // 递归的结束条件
    if (left >= right) return;

    // 1.找到基准元素(pivot)
    const pivot = arr[right];

    // 2.双指针进行交换操作(左边都是比pivot小的数字，右边都是比pivot大的数字)
    let i = left;
    let j = right - 1;
    while (i <= j) {
      while (arr[i] < pivot) {
        // 找左边比pivot大的数字
        i++;
      }
      while (arr[j] > pivot) {
        // 找右边比pivot小的数字
        j--;
      }

      // 此时已经找到了比 pivot大的数字i 和 比pivot小的数字j
      // 交换两个的位置
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }
    // 结束循环的时候，应该把pivot放到正确的位置
    swap(arr, i, right);
    // 左右继续划分区域
    partition(left, j);
    partition(i + 1, right);
  }

  return arr;
}

// testSort(quickSort);
measureSortPerformance(quickSort,10000000)
