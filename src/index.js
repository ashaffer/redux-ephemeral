/**
 * Imports
 */

import * as hamt from 'mini-hamt'

/**
 * Action types
 */

const CREATE = 'CREATE_EPHEMERAL'
const DESTROY = 'DESTROY_EPHEMERAL'

/**
 * Ephemeral state reducer
 */

function ephemeralReducer (state = hamt.empty, action) {
  const {reducer, key} = action.meta.ephemeral

  switch (action.type) {
    case CREATE:
      return hamt.set(state, key, action.payload)
    case DESTROY:
      return hamt.del(state, key)
    default:
      return hamt.set(state, key, reducer(hamt.get(state, key), action))
  }

  return state
}

/**
 * Action creators
 */

function toEphemeral (key, reducer, action) {
  return {
    ...action,
    meta: {
      ...(action.meta || {}),
      ephemeral: {
        key,
        reducer
      }
    }
  }
}

function createEphemeral (key, initialState) {
  return {
    type: CREATE,
    payload: initialState,
    meta: {
      ephemeral: {key},
      logLevel: 'trace'
    }
  }
}

function destroyEphemeral (key) {
  return {
    type: DESTROY,
    meta: {
      ephemeral: {key},
      logLevel: 'trace'
    }
  }
}

function lookup (state, key) {
  return hamt.get(state || hamt.empty, key)
}

/**
 * Mount reducer
 */

function mount (prop, reducer) {
  return (state, action) => isEphemeral(action)
    ? {...state, [prop]: ephemeralReducer(state[prop], action)}
    : reducer(state, action)
}

function isEphemeral (action) {
  return action.meta && action.meta.hasOwnProperty('ephemeral')
}

/**
 * Exports
 */

export default mount
export {
  toEphemeral,
  isEphemeral,
  createEphemeral,
  destroyEphemeral,
  lookup
}
