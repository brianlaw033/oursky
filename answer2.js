function createCache (totalCapacity) {
  const getCurrentTime = () => new Date().getTime()

  function offload (weight) {
    const scoreList = {}
    let keys = Object.keys(this.store)
    keys.sort((a, b) => {
      if (!scoreList[a]) scoreList[a] = getItemScore.bind(this)(a)
      if (!scoreList[b]) scoreList[b] = getItemScore.bind(this)(b)
      return scoreList[a] - scoreList[b]
    })
    while (this.remainingCapacity < weight) {
      this.delete(keys.shift())
    }
  }

  function getItemScore (key) {
    const { lastAccessTime, weight } = this.store[key]
    const currentTime = getCurrentTime()
    if (currentTime !== lastAccessTime) {
      return weight / Math.log(currentTime - lastAccessTime)
    } else {
      return weight / -100
    }
  }

  return {
    store: {},
    get (key) {
      if (!this.store[key]) return -1
      this.store[key].lastAccessTime = getCurrentTime()
      return this.store[key].value
    },
    put (key, value, weight) {
      if (this.totalCapacity < weight) return
      this.remainingCapacity < weight && offload.bind(this)(weight)
      this.store[key] = {
        value,
        weight,
        lastAccessTime: getCurrentTime()
      }
      this.remainingCapacity -= weight
    },
    delete (key) {
      this.remainingCapacity += this.store[key].weight
      delete this.store[key]
    },
    totalCapacity,
    remainingCapacity: totalCapacity,
  }
}

const cache = createCache(1000)
cache.put('cat1', 'I am cat1Value', 300)
cache.put('cat2', 'I am cat2Value', 200)
cache.put('cat3', 'I am cat3Value', 100)
cache.put('cat4', 'I am cat4Value', 400)
console.log(cache.get('cat1'))
console.log(cache.get('cat2'))
console.log(cache.get('cat3'))
console.log(cache.get('cat4'))
cache.put('bigFatCat', 'I am bigFatCat', 600)
console.log(cache.get('cat1'))
console.log(cache.get('cat2'))
console.log(cache.get('cat3'))
console.log(cache.get('cat4'))
console.log(cache.get('bigFatCat'))

// get(key):  O(1), as it always take the same time to get the data.
// put(...):  Between O(n^2) and O(n log(n)),
//            as the V8 engine uses insertion sort for shorter arrays,
//            and uses quick sort for longer arrays,
//            when using Array.prototype.sort()
