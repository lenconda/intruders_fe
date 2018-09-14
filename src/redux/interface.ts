import { TabNavigationState } from './modules/tab_navigation/reducer'
import { FavoritesState } from './modules/favorites/reducer'
import { HistoryState } from './modules/search_history/reducer'

export interface ReduxState {
  tabNavigationState: TabNavigationState
  favoritesState: FavoritesState
  historyState: HistoryState
}