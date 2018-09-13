export function add_favorite(detail: any): object {
  return {
    type: 'ADD_FAVORITE',
    payload: detail
  }
}

export function del_favorite(detail: any): object {
  return {
    type: 'DEL_FAVORITE',
    payload: detail
  }
}