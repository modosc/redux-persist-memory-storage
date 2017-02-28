export default class MemoryStorage {
  constructor ({ logger, initialState = {} } = {}) {
    this.storage = Object.assign({}, initialState)
    this.logger = logger
  }

  log (...args) {
    if (this.logger && typeof this.logger === 'function') {
      this.logger(...args)
    }
  }
  setItem (key, value, callback) {
    return new Promise((resolve, reject) => {
      this.storage[key] = value
      this.log('setItem called with', key, value)
      if (callback) callback(null, value)
      resolve(value)
    })
  }

  getItem (key, callback) {
    return new Promise((resolve, reject) => {
      this.log('getItem called with', key)
      const value = this.storage[key]
      if (callback) callback(null, value)
      resolve(value)
    })
  }

  removeItem (key, callback) {
    return new Promise((resolve, reject) => {
      this.log('removeItem called with', key)
      const value = this.storage[key]
      delete this.storage[key]
      if (callback) callback(null, value)
      resolve(value)
    })
  }

  getAllKeys (callback) {
    return new Promise((resolve, reject) => {
      this.log('getAllKeys called')
      const keys = Object.keys(this.storage)
      if (callback) callback(null, keys)
      resolve(keys)
    })
  }
}
