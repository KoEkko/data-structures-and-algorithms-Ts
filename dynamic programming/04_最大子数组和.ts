function maxSubArray(nums:number[]):number {
  const n = nums.length
  // const dp:number[] = []
  // dp[0] = nums[0]
  let prev = nums[0]
  let max = nums[0]
  for(let i = 1; i< n ; i++) {
    prev = Math.max(prev + nums[i] , nums[i])
    max = Math.max(prev,max)
  }
  return max
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));