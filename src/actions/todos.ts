import { createCustomAction, createAction } from 'typesafe-actions'
import { Todo } from '~/reducers/todos'

export const add = createCustomAction('todos/ADD', (todo: Todo) => ({
  payload: { todo },
}))

export const select = createCustomAction(
  'todos/SELECT',
  (id: Todo['id'], selected: Todo['selected']) => ({
    payload: { id, selected },
  }),
)
