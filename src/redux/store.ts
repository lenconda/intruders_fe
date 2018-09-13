import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { ReduxState } from './interface'
import reducers from './reducers'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore<ReduxState, any, any, any>(persistedReducer, applyMiddleware(createLogger({ collapsed: true })))

export const persistor = persistStore(store)
export default store