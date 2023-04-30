/** 思路
 *  1.定义状态
 * dp[i]: 表示的是这一天能获取到的最大收益是多少
 * 
 *  2.初始化状态
 *  dp[0] = 0
 * 
 *  3.状态转移
 *  当天的价格减去之前价格的最小值
 *  dp[i] = price[i] - minPrice
 * 
 *  4.状态计算
 *  retrun Max(...dp[n])
 * 
 *  ！！！这种方式我们在最后要计算最大值的时候需要遍历dp这个数组求最大值，效率不好
 *  可以将dp[i]表示的状态转换一下
 *  dp[i]表示到当前第i天的时候所能获取的最大收益
 *  当天获取的收益和前一天的收益作比较
 *  dp[i] = Math.max(price[i] - minPrice, dp[i - 1])
 *  最后返回的是dp[n-1]
 */


function maxProfit(price:number[]):number {
  
  const n = price.length
  if(n < 2 ) return 0
  // 1.定义状态
  // const dp:number[] = []
  
  // 2.初始化状态
  // dp[0] = 0
  // 压缩: 只和前一个状态有关系
  let preValue = 0
  // 状态转移方程
  let minPrice = price[0]
  for(let i = 1; i < n; i ++) {
    preValue = Math.max(price[i] - minPrice, preValue)
    minPrice = Math.min(minPrice,price[i])
  }
  return preValue
}
