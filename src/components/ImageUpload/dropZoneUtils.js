import {
  ary, flow, get, identity, isFunction, nthArg, overEvery, partialRight, property, stubTrue,
} from 'lodash'
import { eq, map } from 'lodash/fp'
import { setField } from 'cape-lodash'
import accepts from 'attr-accept'

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
export const handleHover = flow(prevDef, hovering)

export const handleDragOver = action => (
  isFunction(action) ? flow(handleHover, action) : handleHover
)

export function getFiles(event) {
  const targetFiles = get(event, 'target.files', [])
  const files = get(event, 'dataTransfer.files', targetFiles)
  return Array.prototype.slice.call(files)
}
export const onlyFirst = flow(nthArg(1), eq(0))
export const handleDrop = flow(prevDef, getFiles)
export function fileMeta(file) {
  return {
    contentSize: file.size,
    // dateModified: file.
    file,
    fileFormat: file.type,
    lastModified: file.lastModified,
    name: file.name,
  }
}
export const getAcceptChecker = ({ accept, multiple }) => flow(property('file'), overEvery(
  (multiple && stubTrue) || onlyFirst,
  (accept && ary(partialRight(accepts, accept))) || stubTrue
))
export const getFile = props => flow(
  fileMeta,
  setField('isAccepted', getAcceptChecker(props))
)
export const handleOnDrop = props => flow(
  handleDrop,
  map(getFile(props)),
  props.onDrop || identity
)
