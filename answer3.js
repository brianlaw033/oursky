// function createArrayOfFunctions(y) { // Original
//   var arr = [];
//   for (var i = 0; i < y; i++) {
//     arr[i] = function (x) {
//       return x + i;
//     }
//   }
//   return arr;
// }

function solution1 (y) { // let
  var arr = []
  for (let i = 0; i < y; i++) {
    arr[i] = function (x) {
      return x + i
    }
  }
  return arr
}

console.log(solution1(5)[1](1)) // 2
console.log(solution1(5)[1](2)) // 3
console.log(solution1(5)[1](3)) // 4

function solution2 (y) { // Closures
  var arr = []
  for (var i = 0; i < y; i++) {
    (function (i) {
      arr[i] = function (x) {
        return x + i
      }
    })(i)
  }
  return arr
}

console.log(solution2(5)[1](1)) // 2
console.log(solution2(5)[1](2)) // 3
console.log(solution2(5)[1](3)) // 4

// Since var supports function scope only,
// thus it is also available outside the for-loop block.
// By the time the created function is invoked,
// i had gone through the iteration already.

// Solution 1:
// Since ES6, let and const are introduced, and they support block scope,
// i inside the block will not be affected by the incrementation while iterating

// Solution 2:
// Since var is function scoped,
// passing it into a closure, i will capture by it,
// thus will not be affected by the incrementation while iterating
