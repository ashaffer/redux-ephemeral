/**
 * Imports
 */

import setProp from '@micro-js/set-prop'
import omitProp from '@micro-js/omit-prop'

/**
 * Action types
 */

const CREATE = 'CREATE_EPHEMERAL'
const UPDATE = 'UPDATE_EPHEMERAL'
const DESTROY = 'DESTROY_EPHEMERAL'

/**
 * Ephemeral state reducer
 */

function reducer (state, action) {
  switch (action.type) {
    case CREATE: {
      const path = action.meta.key.split('.')
      return setProp(path, state, action.payload || {})
    }
    case UPDATE: {
      const {key, reducer} = action.meta
      const path = key.split('.')
      return setProp(path, state, action.payload)
    }
    case DESTROY: {
      const path = action.meta.key.split('.')
      return omitProp(path, state)
    }
  }

  return state
}

/**
 * Action creators
 */

function createEphemeral (key, initialState) {
  return {
    type: CREATE,
    payload: initialState,
    meta: {key}
  }
}

function updateEphemeral (key, state) {
  return {
    type: UPDATE,
    payload: state,
    meta: {key}
  }
}

function destroyEphemeral (key) {
  return {
    type: DESTROY,
    meta: {key}
  }
}

/**
 * Exports
 */

export default reducer
export {
  createEphemeral,
  updateEphemeral,
  destroyEphemeral
}
