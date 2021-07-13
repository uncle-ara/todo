import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { middlewares, runSagas } from './middlewares'
import rootReducer from './reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'reduxStorage',
  storage,
}

const middlewareEnhancer = applyMiddleware(...middlewares)
const composedEnhancers = compose(middlewareEnhancer)
const combinedReducer = combineReducers(rootReducer)
const persistedReducer = persistReducer(persistConfig, combinedReducer)
const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)

runSagas()

export type State = StateType<typeof combinedReducer>

export default store

// @ts-ignore
window.store = store
