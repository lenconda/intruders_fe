import { combineReducers } from 'redux'
import tabNavigationReducer from './modules/tab_navigation/reducer'
import favoritesReducer from './modules/favorites/reducer'

const appReducer = combineReducers({
  tabNavigationState: tabNavigationReducer,
  favoritesState: favoritesReducer
})

export default appReducer