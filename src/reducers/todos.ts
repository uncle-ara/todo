import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'

import { Action } from '~/actions'
import * as todosActions from '~/actions/todos'
import { change } from '~/actions/filters'
import removeFromObject from '~/helpers/removeFromObject'

export type Todo = {
  id: string
  text: string
  selected?: boolean
}

export enum FilterType {
  All,
  Active,
  Completed,
}

export type TodosState = {
  storage: Record<Todo['id'], Todo>
  filter: FilterType
}

const initialState: TodosState = {
  storage: {},
  filter: FilterType.All,
}

export const reduceTodos: Reducer<TodosState, Action> = (state = initialState, action: Action) => {
  switch (action.type) {
    case getType(todosActions.add):
      return {
        ...state,
        storage: {
          ...state.storage,
          [action.payload.todo.id]: action.payload.todo,
        },
      }
    case getType(todosActions.remove):
      console.log(action.payload.id)
      return {
        ...state,
        storage: removeFromObject(action.payload.id, state.storage),
      }
    case getType(todosActions.select):
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
    case getType(todosActions.selectAll):
      return {
        ...state,
        storage: Object.values(state.storage)
          .map((todo) => ({ ...todo, selected: true }))
          .reduce((acc, todo) => {
            acc[todo.id] = todo
            return acc
          }, {} as TodosState['storage']),
      }
    case getType(todosActions.change):
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
    case getType(change):
      return {
        ...state,
        filter: action.payload.filter,
      }
    default:
      return state
  }
}
