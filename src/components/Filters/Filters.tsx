import React from 'react'
import { FilterType } from '~/reducers/todos'

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

  const handleFilter = (type: FilterType) => {
    changeFilter(type)
    console.log(type + 'отправил')
  }

  return (
    <div className={styles.base}>
      {elements.map(({ type, label }) => (
        <button key={type} onClick={() => handleFilter(type)}>
          {label}
        </button>
      ))}
    </div>
  )
})
