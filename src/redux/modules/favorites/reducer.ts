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
      let currentFavorites = _.rest(state.favorites, action.payload)
      state = {
        ...state,
        favorites: currentFavorites
      }
    default:
      break
  }
  return state
}

export type FavoritesState = typeof initialState
export default favoritesReducer