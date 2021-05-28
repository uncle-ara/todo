import React, { useMemo, useState } from 'react'

import { Input, Button } from 'antd'
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
    if (inputText.trim() != '') {
      addTodo({
        id: uuidv4(),
        text: inputText,
        selected: false,
      })
      setInputText('')
    }
  }

  const handleSelectedRemove = () => {
    for (const todo of Object.values(todosState.storage)) {
      if (todo.selected) {
        remoteTodo(todo.id)
      }
    }
  }

  const hasTodos = Object.values(todosState.storage).length != 0

  return (
    <div className={styles.base}>
      <div className={styles.title}>TODOS</div>
      <div className={styles.panel}>
        <div className={styles.input}>
          <Search
            placeholder="What needs to be done?"
            enterButton="Enter"
            size="large"
            value={inputText}
            onChange={(event) => setInputText(event.currentTarget.value)}
            onSearch={handleClickSendTodo}
          />
        </div>
        {hasTodos && (
          <div className={styles.controls}>
            <Button className={styles.buttonSelect} onClick={selectAll} type="primary" size="small">
              Select all
            </Button>
            {countTodos.completed != 0 && (
              <div className={styles.deleteSelection} onClick={handleSelectedRemove}>
                {`Clear Completed (${countTodos.completed})`}
              </div>
            )}
          </div>
        )}
        {hasTodos && (
          <div className={styles.todos}>
            {Object.values(todosState.storage)
              .filter(filterTodos[todosState.filter])
              .map((todo) => (
                <div className={styles.todo} key={todo.id}>
                  <Todo value={todo} />
                </div>
              ))}
          </div>
        )}
        {hasTodos && (
          <div className={styles.filters}>
            <div className={styles.countTodos}>
              {countTodos.notCompleted
                ? `${countTodos.notCompleted} item left`
                : `${countTodos.notCompleted} items left`}
            </div>
            <Filters />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <p>Double-click to edit a todo</p>
        <p>
          Written by <a href="https://github.com/uncle-ara">Mehmet Ozensel</a>
        </p>
      </div>
    </div>
  )
})
