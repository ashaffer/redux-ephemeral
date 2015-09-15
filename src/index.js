/**
 * Imports
 */

import omit from 'object.omit'

/**
 * Action types
 */

const CREATE = 'CREATE_LOCAL'
const UPDATE = 'UPDATE_LOCAL'
const DESTROY = 'DESTROY_LOCAL'

/**
 * Local state management
 */

function reducer (state, action) {
  switch (action.type) {
    case CREATE:
      const {localReducer, key, initialState = {}} = action.payload

      return {
        ...state,
        local: {
          ...(state.local || {}),
          [key]: {
            key: key,
            reducer: localReducer,
            state: initialState
          }
        }
      }

    case UPDATE:
      const {key} = action.payload
      const local = state.local[key]
      const {localReducer} = local

      return {
        ...state,
        local: {
          ...(state.local || {}),
          [key]: {
            ...state.local[key],
            state: localReducer(local.state, action.payload.action)
          }
        }
      }

    case DESTROY:
      const {key} = action

      return {
        ...state,
        local: omit(state.local || {})
      }
  }

  return state
}

function actions (localReducer) {
  return {
    create (key, initialState) {
      return {
        type: CREATE,
        payload: {localReducer, key, initialState}
      }
    }

    update (key, action) {
      return {
        type: UPDATE,
        payload: {key, action}
      }
    }

    destroy (key) {
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
