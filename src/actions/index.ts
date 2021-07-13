import { ActionType } from 'typesafe-actions'

import * as counter from './counter'
import * as todos from './todos'
import * as filters from './filters'

const actions = { counter, todos, filters }

export type Action = ActionType<typeof actions>

export default actions
