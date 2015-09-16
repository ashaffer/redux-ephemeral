/**
 * Imports
 */

import omit from 'object.omit'

/**
 * Action types
 */

const CREATE = 'CREATE_EPHEMERAL'
const UPDATE = 'UPDATE_EPHEMERAL'
const DESTROY = 'DESTROY_EPHEMERAL'

/**
 * Reducer map
 *
 * Note: We store this outside of state because, strictly speaking, it is not *state*.  It is inherent in the UI rendering tree,
 * and as such, is redundant information.  It is also unserializable, so it would be wrong to materialize it into state.
 */

const localReducers = {}

/**
 * Ephemeral state management
 */

function reducer (state, action) {
  const {key, initialState = {}} = action.payload

  switch (action.type) {
    case CREATE:
      return {
        ...state,
        ephemeral: {
          ...(state.ephemeral || {}),
          [key]: {
            key: key,
            state: initialState
          }
        }
      }

    case UPDATE:
      const ephemeral = state.ephemeral[key]

      return {
        ...state,
        ephemeral: {
          ...(state.ephemeral),
          [key]: {
            ...state.ephemeral[key],
            state: localReducers[key](ephemeral.state, action.payload.action)
          }
        }
      }

    case DESTROY:
      return {
        ...state,
        ephemeral: omit(state.ephemeral, key)
      }
  }

  return state
}

function actions (localReducer) {
  return {
    create (key, initialState) {
      localReducers[key] = localReducer

      return {
        type: CREATE,
        payload: {key, initialState}
      }
    },

    update (key, action) {
      return {
        type: UPDATE,
        payload: {key, action}
      }
    },

    destroy (key) {
      delete localReducers[key]

      return {
        type: DESTROY,
        payload: {key}
      }
    }
  }
}

/**
 * Exports
 */

export default {
  reducer,
  actions
}
