export function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function isSorted(arr:number[]):boolean {
  for(let i =0; i < arr.length - 1; i++) {
    if(arr[i] > arr[i+1]) return false
  }
  return true
}


export function testSort(sortFun:(arr:number[]) => number[]):number[] {
  const nums = Array.from({ length : 10} ,() => {
    return Math.floor(Math.random() * 200)
  })
  console.log(`排序前的顺序是：${nums}`);
  const numsArr = sortFun(nums)
  console.log(`是否是正确的排序：${isSorted(numsArr)},排序后的顺序是：${numsArr}`);
  return numsArr
}


export function measureSortPerformance(sortFun:(arr:number[]) => number[], size:number):void {
  const nums = Array.from({length:size}, () => {
    return Math.floor(Math.random() * size)
  })
  const s = performance.now()
  sortFun(nums)
  const e = performance.now()
  const t = (e - s).toFixed(2)
  console.log(`使用${sortFun.name}算法, 排序${size}个元素, 消耗时间为${t}毫秒`);
}

