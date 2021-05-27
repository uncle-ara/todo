import { createCustomAction, createAction } from 'typesafe-actions'
import { FilterType } from 'reducers/todos'

export const change = createCustomAction('filters/CHANGE', (filter: FilterType) => ({
  payload: { filter },
}))
