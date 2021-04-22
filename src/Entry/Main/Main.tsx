import React from 'react'
import { Input } from 'antd'
import 'antd/dist/antd.css'

import styles from './Main.scss'

const { Search } = Input
const onSearch = (value: any) => console.log(value)

export const Main = React.memo(() => {
  return (
    <div className={styles.base}>
      <div className={styles.title}>TODOS</div>
      <div className={styles.panel}>
        {/* <Input className={styles.input} placeholder="What needs to be done?" /> */}
        <Search
          className={styles.input}
          placeholder="What needs to be done?"
          allowClear
          enterButton="Enter"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  )
})
