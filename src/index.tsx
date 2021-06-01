import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as Redux } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from './store'
import { Entry } from './Entry'

import 'normalize.css'
import './global.scss'

const App = () => {
  return (
    <Redux store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Entry />
      </PersistGate>
    </Redux>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
