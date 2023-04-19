import { ArrayStack } from "./Stack"

function desToBin(number:number):string {
  const stack = new ArrayStack()

  while(number > 0 ) {
    const res = number % 2
    stack.push(res)
    number = Math.floor( number /2 )
  }
  let str = ''
  while(!stack.isEmpty()) {
    str += stack.pop()
  }
  
  return str
}

console.log(desToBin(35));