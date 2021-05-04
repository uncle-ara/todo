import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'

import { Action } from '~/actions'
import { add, change, remove, select } from '~/actions/todos'
import removeFromObject from '~/helpers/removeFromObject'

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
    case getType(remove):
      console.log(action.payload.id)
      return {
        ...state,
        storage: removeFromObject(action.payload.id, state.storage),
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
    case getType(change):
      return {
        ...state,
        storage: {
          ...state.storage,
          [action.payload.id]: {
            ...state.storage[action.payload.id],
            text: action.payload.text,
          },
        },
      }
    default:
      return state
  }
}
