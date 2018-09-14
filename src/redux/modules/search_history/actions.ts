export function add_history(item: string): object {
  return {
    type: 'ADD_HISTORY',
    payload: item
  }
}

export function del_history(item: string): object {
  return {
    type: 'DEL_HISTORY',
    payload: item
  }
}

export function clear_history(): object {
  return {
    type: 'CLEAR_HISTORY',
    payload: []
  }
}