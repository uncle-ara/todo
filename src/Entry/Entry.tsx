import React from 'react'
import { Route, Switch } from 'react-router'
import { Main } from './Main'

export const Entry = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/select-family" exact component={undefined} />
    </Switch>
  )
}
