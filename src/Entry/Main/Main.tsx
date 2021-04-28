import React, { useState } from 'react'
import { Input } from 'antd'
import 'antd/dist/antd.css'
import { v4 as uuidv4 } from 'uuid'

import useAction from '~/hooks/useAction'
import actions from '~/actions'
import * as selectors from '~/selectors'
import useSelector from '~/hooks/useSelector'
import styles from './Main.scss'
import { Todo } from '~/components/Todo'

const { Search } = Input

export const Main = React.memo(() => {
  const [inputText, setInputText] = useState('')
  const addTodo = useAction(actions.todos.add)
  const todosState = useSelector(selectors.todos.select)

  const handleClickSendTodo = () => {
    addTodo({ id: uuidv4(), text: inputText, selected: false })
  }

  return (
    <div className={styles.base}>
      <div className={styles.title}>TODOS</div>
      <div className={styles.panel}>
        <div className={styles.input}>
          <Search
            placeholder="What needs to be done?"
            allowClear
            enterButton="Enter"
            size="large"
            value={inputText}
            onChange={(event) => setInputText(event.currentTarget.value)}
            onSearch={handleClickSendTodo}
          />
        </div>
        <div className={styles.todos}>
          {Object.values(todosState.storage).map((todo) => (
            <Todo key={todo.id} value={todo} />
          ))}
        </div>
      </div>
    </div>
  )
})
