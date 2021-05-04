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
  const changeTodo = useAction(actions.todos.change)
  const [inputText, setInputText] = useState(value.text)
  const [editMode, setEditMode] = useState(false)

  const handleSend = () => {
    setEditMode(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      changeTodo(value.id, inputText)
      setEditMode(false)
    }
  }

  const handleCheck = (event: CheckboxChangeEvent) => {
    selectTodo(value.id, event.target.checked)
  }

  const handleDelete = () => {
    remoteTodo(value.id)
  }

  return (
    <div className={styles.base}>
      <Checkbox checked={value.selected} onChange={handleCheck}>
        {!editMode && (
          <span onDoubleClick={() => setEditMode(true)}>{value.text}</span>
        )}
        {editMode && (
          <input
            onChange={(event) => setInputText(event.currentTarget.value)}
            value={inputText}
            autoFocus={true}
            onBlur={() => setEditMode(false)}
            onKeyDown={handleKeyDown}
          />
        )}
      </Checkbox>
      <button onClick={handleSend}>Change</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
})
