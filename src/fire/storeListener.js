import { partial } from 'lodash'
import { dbChanges, handleAuth } from './handler'

// const types = ['ShowGroup', 'Show', 'Program', 'Location', 'Person', 'Student']

export default function storeListener(firebase, store) {
  // const loadWatchType = typeLoadWatch(firebase, store)
  firebase.auth.onAuthStateChanged(partial(handleAuth, firebase, store))
  dbChanges(firebase, store)
  // forEach(types, loadWatchType)
  return store
}
