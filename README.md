# redux-persist-memory-storage [![npm version](https://badge.fury.io/js/redux-persist-memory-storage.svg)](https://badge.fury.io/js/redux-persist-memory-storage) ![Node.js CI](https://github.com/modosc/redux-persist-memory-storage/workflows/Node.js%20CI/badge.svg)

[Redux Persist](https://github.com/rt2zz/redux-persist) memory storage adapter.

Data isn't persisted anywhere other than memory so this isn't appropriate for general use. There are a few cases where this may be useful:

1. As a fallback when trying to use [localforage](https://github.com/localForage/localForage) or [redux-persist-cookie-storage](https://github.com/abersager/redux-persist-cookie-storage) on a client that's blocked access to `cookies` or `localStorage` (see [this](https://github.com/rt2zz/redux-persist/issues/264) discussion for more)
2. In testing


## Installation
Install with [npm](https://www.npmjs.com/):
```
npm install redux-persist-memory-storage
```

## Usage
### Client
Conditionally use [redux-persist-cookie-storage](https://github.com/abersager/redux-persist-cookie-storage):
```
import { persistStore, autoRehydrate } from 'redux-persist'
import MemoryStorage from 'redux-persist-memory-storage'
import CookieStorage from 'redux-persist-cookie-storage'

const store = createStore(reducer, undefined, autoRehydrate())
persistStore(store, { storage: navigator && navigator.cookieEnabled ? new CookieStorage() : new MemoryStorage() })

```
Conditionally use [localforage](https://github.com/localForage/localForage)
```
import { persistStore, autoRehydrate } from 'redux-persist'
import MemoryStorage from 'redux-persist-memory-storage'
import localForage from 'localforage'

const store = createStore(reducer, undefined, autoRehydrate())
let enableLocalForage = true
try {
  window.localStorage.setItem('__u', 'u')
} catch (e) {
  enableLocalForage = false
}

persistStore(store, { storage: enableLocalForage ? localForage : new MemoryStorage() })

```

### Options
```
new MemoryStorage({ initialState = {}, logger })
```
 * `initialState` - optional initial state object
 * `logger` - optional function called for debugging:
```
> const storage = new MemoryStorage({ logger: console.log.bind(console) })
> storage.setItem('foo', 'bar')
setItem called with foo bar

```
