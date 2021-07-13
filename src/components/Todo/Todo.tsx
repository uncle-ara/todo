import React, { useState } from 'react'
import cx from 'classnames'
import { Checkbox, Input } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Todo as TodoStruct } from '~/reducers/todos'
import useAction from '~/hooks/useAction'
import actions from '~/actions'
import styles from './Todo.scss'

export type Props = {
  value: TodoStruct
}

export const Todo = React.memo(({ value }: Props) => {
  const selectTodo = useAction(actions.todos.select)
  const remoteTodo = useAction(actions.todos.remove)
  const changeTodo = useAction(actions.todos.change)
  const [inputText, setInputText] = useState(value.text)
  const [editMode, setEditMode] = useState(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      changeTodo(value.id, inputText)
      setEditMode(false)
    }
  }

  const handleBlur = () => {
    changeTodo(value.id, inputText)
    setEditMode(false)
  }

  const handleCheck = (event: CheckboxChangeEvent) => {
    selectTodo(value.id, event.target.checked)
  }

  return (
    <div className={value.selected ? cx(styles.base, styles.base_selected) : styles.base}>
      <div className={styles.wrapper}>
        <div className={styles.todo}>
          <Checkbox
            className={styles.checkbox}
            checked={value.selected}
            onChange={handleCheck}
          ></Checkbox>
          {!editMode && (
            <span
              className={value.selected ? cx(styles.text, styles.text_selected) : styles.text}
              onDoubleClick={() => setEditMode(true)}
            >
              {value.text}
            </span>
          )}
          {editMode && (
            <Input
              className={styles.input}
              size={'small'}
              onChange={(event) => setInputText(event.currentTarget.value)}
              value={inputText}
              autoFocus={true}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
        <div className={styles.controls}>
          <EditOutlined className={styles.editTodo} onClick={() => setEditMode(true)} />
          <DeleteOutlined className={styles.deleteTodo} onClick={() => remoteTodo(value.id)} />
        </div>
      </div>
    </div>
  )
})
