/**
 * Imports
 */

import setProp from '@micro-js/set-prop'
import omitProp from '@micro-js/omit-prop'

/**
 * Action types
 */

const UPDATE = 'UPDATE_EPHEMERAL'
const DESTROY = 'DESTROY_EPHEMERAL'

/**
 * Ephemeral state reducer
 */

function reducer (state = {}, action) {
  switch (action.type) {
    case UPDATE:
      return setProp(action.meta.key, state, action.payload)
    case DESTROY:
      return omitProp(action.meta.key, state)
  }

  return state
}

/**
 * Action creators
 */

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
  updateEphemeral,
  destroyEphemeral
}
