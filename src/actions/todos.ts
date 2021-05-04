import { createCustomAction, createAction } from 'typesafe-actions'
import { Todo } from '~/reducers/todos'

export const add = createCustomAction('todos/ADD', (todo: Todo) => ({
  payload: { todo },
}))

export const remove = createCustomAction('todos/REMOVE', (id: Todo['id']) => ({
  payload: { id },
}))

export const select = createCustomAction(
  'todos/SELECT',
  (id: Todo['id'], selected: Todo['selected']) => ({
    payload: { id, selected },
  }),
)

export const change = createCustomAction(
  'todos/CHANGE',
  (id: Todo['id'], text: Todo['text']) => ({
    payload: { id, text },
  }),
)
