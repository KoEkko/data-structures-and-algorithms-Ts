import { ArrayStack } from "./Stack";

function isValid(str: string):boolean {
  const stack = new ArrayStack()

  for(let i = 0; i < str.length ; i ++) {
    const c = str[i]
    switch(c) {
      case "(":
        stack.push(")")
        break
      case "{":
        stack.push("}")
        break
      case "[":
        stack.push("]")
        break
      default:
        if(c !== stack.pop()) return false
    }
  }
  return stack.isEmpty()
}

console.log(isValid("(){}[]"));
console.log(isValid("({})[]"));
console.log(isValid("({})}[]"));