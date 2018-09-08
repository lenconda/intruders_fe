export function changeTabBar(newTabBar: any): object {
  return {
    type: 'CHANGE_TABBAR',
    payload: newTabBar
  }
}