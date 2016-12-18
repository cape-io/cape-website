import React, { PropTypes } from 'react'
import css from '../../style'
import { handleHover, handleOnDrop } from './dropZoneUtils'
import FileUploading from './DropZoneUploading'

const baseStyle = css('bgGray mw7 p2 m2 h7')
const styles = {
  base: baseStyle,
  onHover: { ...baseStyle, ...css('bgWashedBlue ba bw0p125') },
}

function DropZone(props) {
  const { hasHover, message, isSaving, savedProgress, style, uploadStarted, value, ...rest } = props
  if (uploadStarted) {
    return (
      <FileUploading isSaving={isSaving} savedProgress={savedProgress} value={value} />
    )
  }
  const inlineStyle = hasHover ? styles.onHover : styles.base
  // console.log(rest)
  return (
    <div {...rest} style={{ ...inlineStyle, ...style }} onDrop={handleOnDrop(rest)}>
      <p>{message}</p>
      {hasHover && <p>Drop it</p>}
    </div>
  )
}

DropZone.propTypes = {
  hasBlur: PropTypes.bool,
  hasHover: PropTypes.bool,
  id: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  message: PropTypes.string.isRequired,
  style: PropTypes.object,
}
DropZone.defaultProps = {
  message: 'Drop in a new file to upload.',
  multiple: false,
  onDragOver: handleHover,
  style: {},
}
export default DropZone
