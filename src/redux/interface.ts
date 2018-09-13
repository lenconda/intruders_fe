import { TabNavigationState } from './modules/tab_navigation/reducer'
import { FavoritesState } from './modules/favorites/reducer'

export interface ReduxState {
  tabNavigationState: TabNavigationState
  favoritesState: FavoritesState
}