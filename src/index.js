/**
 * Imports
 */

import getProp from '@f/get-prop'
import setProp from '@f/set-prop'
import omitProp from '@f/omit-prop'

/**
 * Action types
 */

const CREATE = 'CREATE_EPHEMERAL'
const DESTROY = 'DESTROY_EPHEMERAL'

/**
 * Ephemeral state reducer
 */

function ephemeralReducer (state = {}, action) {
  const {reducer, key} = action.meta.ephemeral

  switch (action.type) {
    case CREATE:
      return setProp(key, state, action.payload)
    case DESTROY:
      return omitProp(key, state)
    default:
      const newState = reducer(getProp(key, state), action)
      return setProp(key, state, newState)
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
      ephemeral: {key}
    }
  }
}

function destroyEphemeral (key) {
  return {
    type: DESTROY,
    meta: {
      ephemeral: {key}
    }
  }
}

/**
 * Mount reducer
 */

function mount (prop, reducer) {
  return (state, action) => isEphemeral(action)
    ? {...state, [prop]: ephemeralReducer(state[prop] || {}, action)}
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
  createEphemeral,
  destroyEphemeral
}
