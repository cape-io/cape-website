import React, { PropTypes } from 'react'
import { filter, flow, get, isFunction } from 'lodash'
import css from '../../style'

export function prevDef(event) {
  if (event && isFunction(event.preventDefault)) event.preventDefault()
  return event
}

export function getFiles(event) {
  const targetFiles = get(event, 'target.files', [])
  // console.log(targetFiles, event.dataTransfer)
  return Array.prototype.slice.call(get(event, 'dataTransfer.files', targetFiles))
}

export const handleDrop = flow(prevDef, getFiles)

function hovering(event) {
  if (event.stopPropagation) event.stopPropagation()
  try {
    event.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
  } catch (err) {
    // continue regardless of error
  }
  return event
}
export const handleHover = flow(prevDef, hovering)
const baseStyle = css('bgGray mw7 p2 m2 h7')
const styles = {
  base: baseStyle,
  onHover: { ...baseStyle, ...css('bgWashedBlue ba bw0p125') },
}
function DropZone({ hasHover, id, message, onDragEnter, onDragLeave, onDragOver, onDrop }) {
  // onClick={activateFileSelect}
  const style = hasHover ? styles.onHover : styles.base
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={flow(filter([handleHover, onDragOver]))}
      onDrop={flow(filter([handleDrop, onDrop]))}
      id={id}
      style={style}
    >
      <p>{message}</p>
      {hasHover && <p>Drop it</p>}
    </div>
  )
}

DropZone.propTypes = {
  hasHover: PropTypes.bool,
  id: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  message: PropTypes.string.isRequired,
}
DropZone.defaultProps = {
  message: 'Click here or drop in a new image to upload.',
}
export default DropZone
