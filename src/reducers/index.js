import { combineReducers } from 'redux'
import {
  INITIALIZING,
  INITIALIZED,
  EDIT_NAME,
  EDIT_DESC,
  SET_FILTER
} from '../actions'

const initialState = {
  isLoading: false,
  items: [],
  groups:[],
  selectedFilter: 'all'
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZING:
      return {
        ...state,
        isLoading: true
      }
    case INITIALIZED:
      let groups = []
      action.data.colorsArray.forEach(item => {
        if (!groups.includes(item.group))
          groups[groups.length] = item.group
      })
      return {
        ...state,
        isLoading: false,
        items: action.data.colorsArray,
        groups: groups,
      }
    case EDIT_NAME:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            item.name = action.name
          }
          return item
        })
      }
    case EDIT_DESC:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            item.description = action.desc
          }
          return item
        })
      }
    case SET_FILTER:
      return {
        ...state,
        selectedFilter: action.selectedFilter
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data
})

export default rootReducer
