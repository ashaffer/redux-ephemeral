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
 * Ephemeral state reducer
 */

function reducer (state, action) {
  switch (action.type) {
    case CREATE: {
      const locale = action.meta.locale
      const path = locale.split('.')
      localReducers[locale] = action.payload.reducer
      return update(path, action.payload.initialState, state)
    }
    case UPDATE: {
      const locale = action.meta.locale
      const path = locale.split('.')
      const reducer = localReducers[locale]

      return update(path, reducer(get(path, state), action.payload), state)
    }
    case DESTROY: {
      return destroy(action.meta.locale.split('.'), state)
    }
  }

  return state
}

/**
 * Utilities
 */

function get (path, state) {
  return path.reduce((acc, key) => acc[key], state)
}

function update (path, value = {}, state) {
  const key = path[0]

  if (path.length === 0) {
    return value
  }

  return {
    ...state,
    [key]: update(path.slice(1), value, state[key])
  }
}

function destroy (path, state) {
  const key = path[0]

  if (path.length === 1) {
    return omit(state, key)
  }

  return {
    ...state,
    [key]: update(path.slice(1), state[key])
  }
}

/**
 * Action creators
 */

function createEphemeral (locale, reducer, initialState) {
  return {
    type: CREATE,
    payload: {initialState, reducer},
    meta: {locale}
  }
}

function updateEphemeral (locale, action) {
  return {
    type: UPDATE,
    payload: action,
    meta: {locale}
  }
}

function destroyEphemeral (locale) {
  return {
    type: DESTROY,
    meta: {locale}
  }
}

function computePath (locale) {
  const path = []

  while (locale) {
    path.push(locale)
    locale = parents[locale]
  }

  return path.reverse()
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
