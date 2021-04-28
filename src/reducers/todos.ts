import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'

import { Action } from '~/actions'
import { add, select } from '~/actions/todos'

export type Todo = {
  id: string
  text: string
  selected?: boolean
}

export type TodosState = {
  storage: Record<Todo['id'], Todo>
}

const initialState: TodosState = {
  storage: {},
}

export const reduceTodos: Reducer<TodosState, Action> = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case getType(add):
      return {
        ...state,
        storage: {
          ...state.storage,
          [action.payload.todo.id]: action.payload.todo,
        },
      }
    case getType(select):
      return {
        ...state,
        storage: {
          ...state.storage,
          [action.payload.id]: {
            ...state.storage[action.payload.id],
            selected: action.payload.selected,
          },
        },
      }
    default:
      return state
  }
}
