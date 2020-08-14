function isSubset (arr1, arr2) {
  const list = {}
  arr1.forEach(char => (list[char] = true))
  return arr2.every(char => list[char])
}
// O(n), loop n times when n is the sum of length of the 2 arrays

console.log(isSubset(['A', 'B', 'C', 'D', 'E'], ['A', 'E', 'D'])) // true
console.log(isSubset(['A', 'B', 'C', 'D', 'E'], ['A', 'D', 'Z'])) // false
console.log(isSubset(['A', 'D', 'E'], ['A', 'A', 'D', 'E'])) // true
