import React, { useState } from 'react'
import { Checkbox } from 'antd'

import { Todo as TodoStruct } from '~/reducers/todos'
import useAction from '~/hooks/useAction'
import actions from '~/actions'
import styles from './Todo.scss'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

export type Props = {
  value: TodoStruct
}

export const Todo = React.memo(({ value }: Props) => {
  const selectTodo = useAction(actions.todos.select)
  const remoteTodo = useAction(actions.todos.remove)

  const handleCheck = (event: CheckboxChangeEvent) => {
    console.log('Данные отправлены...')
    selectTodo(value.id, event.target.checked)
  }

  const handleDelete = () => {
    remoteTodo(value.id)
  }

  return (
    <div className={styles.base}>
      <Checkbox checked={value.selected} onChange={handleCheck}>
        {value.text}
      </Checkbox>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
})
