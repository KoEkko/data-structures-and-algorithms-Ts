import { measureSortPerformance, testSort } from "./utils"

function mergeSort(arr:number[]):number[] {
  // 0.递归的结束条件
  if(arr.length <= 1) return arr

  // 1.分解
  const midIndex = Math.floor(arr.length / 2)
  const leftArr = arr.slice(0,midIndex)
  const rightArr = arr.slice(midIndex)
  // 1.1 递归的分解
  const newLeftArr = mergeSort(leftArr)
  const newRightArr = mergeSort(rightArr)
  
  // 第一次来到这个区域的代码的时候 ,newLeftArr 和 newRightArr 都是长度为1的数组
  // 2.合并
  // 2.1 定义双指针
  const newArr:number[] = []
  let i = 0
  let j = 0
  while( i < newLeftArr.length && j < newRightArr.length) {
    if(newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i])
      i++
    } else {
      newArr.push(newRightArr[j])
      j++
    }
  }

  // 当数组有剩余的时候
  if( i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i))
  }
  if( j < newRightArr.length) {
    newArr.push(...newRightArr.slice(j))
  }

  // 3.返回新的数组
  return newArr
}

// testSort(mergeSort)
measureSortPerformance(mergeSort,1000000)