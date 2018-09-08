interface State {
  selectedTab: string
}

const initialState: State = {
  selectedTab: '发现'
}

const tabNavigationReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGE_TABBAR':
      state = {
        ...state,
        selectedTab: action.payload
      }
      break
    default:
      break
  }
  return state
}

export type TabNavigationState = typeof initialState
export default tabNavigationReducer