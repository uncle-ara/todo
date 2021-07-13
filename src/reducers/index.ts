import { reduceCounter } from './counter'
import { reduceTodos } from './todos'

const reducers = {
  counter: reduceCounter,
  todos: reduceTodos,
}

export default reducers
