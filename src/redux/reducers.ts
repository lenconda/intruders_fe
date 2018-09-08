import { combineReducers } from 'redux'
import tabNavigationReducer from './modules/tab_navigation/reducer'

const appReducer = combineReducers({
  tabNavigationState: tabNavigationReducer
})

export default appReducer