import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { ReduxState } from './interface'
import reducers from './reducers'

const store = createStore<ReduxState, any, any, any>(reducers, applyMiddleware(createLogger({ collapsed: true })))

export default store