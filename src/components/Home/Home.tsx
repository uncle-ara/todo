// NEED FOR EXAMPLE
import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import actions from '~/actions'
import useSelector from '~/hooks/useSelector'
import useAction from '~/hooks/useAction'
import * as selectors from '~/selectors'
import styles from './Home.scss'

export const Home = React.memo(() => {
  const counter = useSelector(selectors.counter.select)
  const increment = useAction(() => actions.counter.add(1))
  const decrement = useAction(() => actions.counter.add(-1))
  const reset = useAction(actions.counter.reset)

  return (
    <div className={styles.base}>
      <Switch>
        <Route path="/" exact>
          <div>hello everybody</div>
          <Link to="/example">to example</Link>
        </Route>
        <Route path="/example" exact>
          <p>this is example page</p>
          <div>
            <p>{counter.value}</p>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>reset</button>
            <button onClick={increment}>+</button>
          </div>
        </Route>
      </Switch>
    </div>
  )
})
