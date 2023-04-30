/*  递归求解 */
// 常规递推来解决斐波那契数列，性能会很差，因为有很多重复计算的操作
// 优化的方案可以采取 记忆化搜索

// function fib(n:number, memo:number[] = [] ):number {
//   // 递归求解的时候，要确保传进去的数组是同一个
//   if( n <= 1) return n
//   // 已经计算过的情况下，直接取值
//   if(memo[n]) {
//     return memo[n]
//   }
//   // 没有就计算，保存
//   const result = fib(n-1,memo) + fib(n-2,memo)
//   memo[n] = result

//   return result
// }
// const s = performance.now()
// console.log(fib(50));
// const e = performance.now()
// console.log(e - s);

/* 动态规划 */

// function fib(n:number):number {
//   const dp:number[] = []
//   dp[0] = 0
//   dp[1] = 1
//   for(let i = 2; i <= n; i++) {
//     dp[i] = dp[i-1] + dp[i-2]
//   }
//   return dp[n]
// }

// 状态压缩
function fib(n:number):number {
  if(n <= 1) return n
  let prev = 0
  let curr = 1
  for(let i = 2; i<=n;i++) {
    const newValue = prev+curr
    prev = curr
    curr = newValue
  }
  return curr
}

console.log(fib(10));