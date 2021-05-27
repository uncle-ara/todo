import React from 'react'
import { Radio } from 'antd'
import { FilterType } from '~/reducers/todos'

import { useSelector } from 'react-redux'
import * as selectors from '~/selectors'
import useAction from '~/hooks/useAction'
import actions from '~/actions'

import styles from './Filters.scss'

const elements = [
  { type: FilterType.All, label: 'All' },
  { type: FilterType.Active, label: 'Active' },
  { type: FilterType.Completed, label: 'Completed' },
]
export const Filters = React.memo(() => {
  const changeFilter = useAction(actions.filters.change)
  const filter = useSelector(selectors.todos.filter)

  const handleFilter = (type: FilterType) => {
    changeFilter(type)
    console.log(type + 'отправил')
  }

  return (
    <div className={styles.base}>
      <Radio.Group value={filter}>
        {elements.map(({ type, label }) => (
          <Radio.Button key={type} onClick={() => handleFilter(type)} value={type}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
})
