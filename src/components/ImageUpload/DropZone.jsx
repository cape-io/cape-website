import React, { PropTypes } from 'react'
import css from '../../style'

const baseStyle = css('bgGray mw7 p2 m2 h7')
const styles = {
  base: baseStyle,
  onHover: { ...baseStyle, ...css('bgWashedBlue ba bw0p125') },
}

function DropZone({ hasHover, message, style, ...props }) {
  // onClick={activateFileSelect}
  const inlineStyle = hasHover ? styles.onHover : styles.base
  return (
    <div {...props} style={{ ...inlineStyle, ...style }}>
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
  style: PropTypes.object,
}
DropZone.defaultProps = {
  message: 'Drop in a new file to upload.',
  style: {},
}
export default DropZone
