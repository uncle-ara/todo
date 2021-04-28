import { ActionType } from 'typesafe-actions'

import * as counter from './counter'
import * as todos from './todos'

const actions = { counter, todos }

export type Action = ActionType<typeof actions>

export default actions
