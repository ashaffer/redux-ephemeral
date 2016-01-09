
# redux-ephemeral

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Library for managing transient local state in redux

## Installation

    $ npm install redux-ephemeral

## Setup

Wrap your root reducer with redux-ephemeral, like so:

```javascript
import ephemeral from 'redux-ephemeral'

function reducer (state, action) {
  // your app's reducer logic
}

export default ephemeral('ui', reducer)
```

The `'ui'` argument specifies where in your state to mount your ephemeral state. So, in the example above, all transient/local state will be mounted under `state.ui`.

## Usage

redux-ephemeral exports three action creators:

  * `createEphemeral(key, state)` - Initialize the ephemeral state at path `key` to `state`
  * `toEphemeral(key, reducer, action)` - Direct an ephemeral action to the path specified by `key`, and reducer it with `reducer` when it gets there
  * `destroyEphemeral(key)` - Destroy the chunk of ephemeral state specified by `key`

This library can be used directly in components, but it is intended to be a low-level library that is consumed by a higher-level local state abstraction.  Check out [virtex-local](https://github.com/ashaffer/virtex-local) for such an example.

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
