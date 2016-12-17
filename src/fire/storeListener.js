import { forEach, partial } from 'lodash'
import { dbChanges, handleAuth, typeLoadWatch } from './handler'

const types = ['MediaObject', 'Person']

export default function storeListener(firebase, store) {
  const loadWatchType = typeLoadWatch(firebase, store)
  firebase.auth.onAuthStateChanged(partial(handleAuth, firebase, store))
  dbChanges(firebase, store)
  forEach(types, loadWatchType)
  return store
}
