export const INITIALIZING = 'INITIALIZING'
export const INITIALIZED  = 'INITIALIZED'
export const EDIT_NAME    = 'EDIT_NAME'
export const EDIT_DESC    = 'EDIT_DESC'
export const SET_FILTER   = 'SET_FILTER'

const initializing = () => ({
  type: INITIALIZING
})
const initialized = data => ({
  type: INITIALIZED,
  data
})
export const fetchData = () => dispatch => {
  dispatch(initializing())
  return fetch('/test.json')
    .then(response => response.json())
    .then(data => dispatch(initialized(data)))
}

export const editName = (id, name) => ({
  type: EDIT_NAME,
  id,
  name
})

export const editDesc = (id, desc) => ({
  type: EDIT_DESC,
  id,
  desc
})

export const setFilter = selectedFilter => ({
  type: SET_FILTER,
  selectedFilter
})
