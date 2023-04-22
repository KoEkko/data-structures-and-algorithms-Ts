function hashFunc(code:string,max:number):number {
  
  let hashCode = 0
  let length = code.length
  for(let i =0; i < length; i ++) {
    // 霍纳法则计算hashCode
    hashCode = 31 * hashCode + code.charCodeAt(i)
  }
  // 索引值
  const index = hashCode % max
  return index
}