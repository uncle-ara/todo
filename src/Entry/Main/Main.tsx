import React, { useMemo, useState } from 'react'

import { Divider, Input } from 'antd'
import 'antd/dist/antd.css'
import { v4 as uuidv4 } from 'uuid'

import useAction from '~/hooks/useAction'
import actions from '~/actions'
import * as selectors from '~/selectors'
import useSelector from '~/hooks/useSelector'
import styles from './Main.scss'
import { Todo } from '~/components/Todo'
import { FilterType, Todo as TodoData } from '../../reducers/todos'
import { Filters } from '~/components/Filters'

const { Search } = Input

const filterTodos = {
  [FilterType.All]: () => true,
  [FilterType.Active]: (todo: TodoData) => todo.selected === false,
  [FilterType.Completed]: (todo: TodoData) => todo.selected === true,
} as const

export const Main = React.memo(() => {
  const [inputText, setInputText] = useState('')
  const addTodo = useAction(actions.todos.add)
  const remoteTodo = useAction(actions.todos.remove)
  const selectAll = useAction(actions.todos.selectAll)
  const todosState = useSelector(selectors.todos.select)

  const countTodos = useMemo(
    () =>
      Object.values(todosState.storage).reduce(
        (count, todo) => {
          if (todo.selected) {
            count.completed += 1
          } else {
            count.notCompleted += 1
          }
          return count
        },
        { completed: 0, notCompleted: 0 },
      ),
    [todosState.storage],
  )

  const handleClickSendTodo = () => {
    addTodo({
      id: uuidv4(),
      text: inputText,
      selected: false,
    })
    setInputText('')
  }

  const handleSelectedRemove = () => {
    for (const iterator of Object.values(todosState.storage)) {
      if (iterator.selected) {
        remoteTodo(iterator.id)
      }
    }
  }

  return (
    <div className={styles.base}>
      <div className={styles.title}>TODOS</div>
      <div className={styles.panel}>
        <div className={styles.input}>
          <button onClick={handleSelectedRemove}>Delete</button>
          <button onClick={selectAll}>All</button>
          <div>{countTodos.notCompleted} Item left</div>
          <div>Clear completed ({countTodos.completed})</div>

          <Search
            placeholder="What needs to be done?"
            enterButton="Enter"
            size="large"
            value={inputText}
            onChange={(event) => setInputText(event.currentTarget.value)}
            onSearch={handleClickSendTodo}
          />
        </div>
        <div className={styles.todos}>
          {Object.values(todosState.storage)
            .filter(filterTodos[todosState.filter])
            .map((todo) => (
              <Todo key={todo.id} value={todo} />
            ))}
        </div>
        <div className={styles.filters}>
          {Object.keys(todosState.storage).length != 0 && <Filters />}
        </div>
      </div>
    </div>
  )
})
