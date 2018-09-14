import { combineReducers } from 'redux'
import tabNavigationReducer from './modules/tab_navigation/reducer'
import favoritesReducer from './modules/favorites/reducer'
import historyReducer from './modules/search_history/reducer'

const appReducer = combineReducers({
  tabNavigationState: tabNavigationReducer,
  favoritesState: favoritesReducer,
  historyState: historyReducer
})

export default appReducer