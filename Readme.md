
# redux-ephemeral

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Pattern for managing transient local state in redux

## Installation

    $ npm install redux-ephemeral

## Setup

Add redux-ephemeral to your primary redux reducer:

`reduceReducers(reducer, ephemeral)`

## Usage

redux-ephemeral exports three action creators:

  * `createEphemeral(key, reducer, initialState)` - Create a chunk of ephemeral state at the dotted path specified by `key` in the global state atom, initialize it to `initialState` and bind `reducer` to it.
  * `updateEphemeral(key, action)` - Direct an action to a particular chunk of ephemeral state, specified by `key`.  `action` will be processed by the reducer who was bound to the piece of state specified by `key`.
  * `destroyEphemeral(key)` - Destroy the chunk of ephemeral state specified by `key`.

This library can be used directly in components, but it is intended to be a low-level library that is consumed by a higher-level local state abstraction.  Check out [vdux-local](https://github.com/ashaffer/vdux-local) for an example of one such.

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
