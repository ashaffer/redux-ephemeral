
# redux-ephemeral

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Pattern for managing transient local state in redux

## Installation

    $ npm install redux-ephemeral

## Setup

Add redux-ephemeral to your primary redux reducer:

`reduceReducers(reducer, ephemeral)`

Or you can mount it at a particular path, to keep your ephemeral state in one place:

`combineReducers({components: ephemeral ...otherReducers})

## Usage

redux-ephemeral exports two action creators:

  * `updateEphemeral(key, state)` - Update the ephemeral state at path `key` to `state` (can also be used to initialize it).
  * `destroyEphemeral(key)` - Destroy the chunk of ephemeral state specified by `key`.

This library can be used directly in components, but it is intended to be a low-level library that is consumed by a higher-level local state abstraction.  Check out [vdux-local](https://github.com/ashaffer/vdux-local) for an example of one such.

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
