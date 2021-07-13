import { State } from '~/store'

export const select = (state: State) => state.todos
export const filter = (state: State) => select(state).filter
