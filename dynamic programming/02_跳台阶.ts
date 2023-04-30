// function jump(n:number):number {
//   // 1.定义状态
//   const dp:number[] = []
//   // 2.初始化状态
//   dp[0] = 1
//   dp[1] = 1
//   // 3.状态转移方程
//   for(let i = 2; i<= n; i++) {
//     dp[i] = dp[i-1] + dp[i-2]
//   }
//   return dp[n]
// }

function jump(n:number):number {
  if(n === 1) return 1
  let prev = 1
  let curr = 1
  for(let i = 2; i<= n; i++) {
    const newValue = prev + curr
    prev = curr
    curr = newValue
  }
  return curr
}

console.log(jump(3));
console.log(jump(4));