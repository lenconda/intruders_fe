import _ from 'lodash'

interface State {
  favorites: Array<any>
}

const initialState: State = {
  favorites: []
}

const favoritesReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      state = {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
      break
    case 'DEL_FAVORITE':
      _.remove(state.favorites, {
        url: action.payload.url
      })
      state = {
        ...state
      }
    default:
      break
  }
  return state
}

export type favoritesState = typeof initialState
export default favoritesReducer