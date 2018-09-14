import _ from 'lodash'

interface State {
  histories: Array<string>
}

const initialState: State = {
  histories: []
}

const historyReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_HISTORY':
      state = {
        ...state,
        histories: [...state.histories, action.payload]
      }
      break
    case 'DEL_HISTORY':
      state = {
        ...state,
        histories: _.remove(state.histories, item => item !== action.payload)
      }
      break
    case 'CLEAR_HISTORY':
      state = {
        ...state,
        histories: []
      }
      break
    default:
      break
  }
  return state
}

export type HistoryState = typeof initialState
export default historyReducer