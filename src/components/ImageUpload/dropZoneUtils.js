import {
  flow, get, identity, isFunction, overEvery,
  partial, partialRight, property, stubTrue,
} from 'lodash'
import { eq, filter, map } from 'lodash/fp'
import { setField } from 'cape-lodash'
import accepts from 'attr-accept'

const mapWithKey = map.convert({ cap: false })

export function prevDef(event) {
  if (event && isFunction(event.preventDefault)) event.preventDefault()
  return event
}

export function hovering(event) {
  if (event.stopPropagation) event.stopPropagation()
  try {
    event.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
  } catch (err) {
    // continue regardless of error
  }
  return event
}
// Use this for `onDragOver`.
export const handleHover = flow(prevDef, hovering)
// Call this with your action to call after default handling.
export const handleDragOver = partial(flow, handleHover)

export function getFiles(event) {
  const targetFiles = get(event, 'target.files', [])
  const files = get(event, 'dataTransfer.files', targetFiles)
  return Array.prototype.slice.call(files)
}
export const handleDrop = flow(prevDef, getFiles)
export function fileMeta(file, index = 0) {
  if (!file.type && !file.name) {
    console.error(file)
    throw new Error('File must contain type or name attribute.')
  }
  return {
    contentSize: file.size,
    // dateModified: file.
    file,
    fileFormat: file.type,
    index,
    lastModified: file.lastModified,
    name: file.name,
  }
}
export const onlyFirst = flow(property('index'), eq(0))
export const acceptChecker = accept => flow(
  property('file'),
  partialRight(accepts, accept)
)
// getAcceptChecker(props)(file) returns boolean.
export const getAcceptChecker = ({ accept, multiple }) => overEvery(
  multiple ? stubTrue : onlyFirst,
  accept ? acceptChecker(accept) : stubTrue
)
export const getFile = props => flow(
  fileMeta,
  setField('isAccepted', getAcceptChecker(props))
)
export const onlyAccepted = filter({ isAccepted: true })
export const handleOnDrop = props => flow(
  handleDrop,
  mapWithKey(getFile(props)),
  props.onDrop || identity
)
