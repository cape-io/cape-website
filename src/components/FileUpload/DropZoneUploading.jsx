import React, { PropTypes } from 'react'
import { humanFileSize } from './dropZoneUtils'

function FileUploading({ isSaving, savedProgress, value }) {
  const progressStr = `${savedProgress}%`
  const { contentSize, name } = value
  const humanSize = humanFileSize(contentSize)
  const waitTxt = 'Calculating sha1 and preparing for upload.'

  return (
    <div className="dz-preview dz-processing dz-image-preview col-md-2">
      <div className="dz-details">
        <div className="dz-filename"><span>{name}</span></div>
        <div className="dz-size">
          <span className="dz-size-value">{humanSize.value}</span>
          <span className="dz-size-unit">{humanSize.unitText}</span>
        </div>
      </div>
      {!isSaving && <p>{waitTxt}</p>}
      {isSaving && <p>Saving</p>}
      { savedProgress && isSaving &&
        <div className="dz-progress progress">
          <div
            className="progress-bar" role="progressbar"
            style={{ backgroundColor: 'lightgreen', width: progressStr }}
            aria-valuenow={savedProgress} aria-valuemin="0" aria-valuemax="100"
          >
            {progressStr}
          </div>
        </div>
      }
    </div>
  )
}
FileUploading.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
  savedProgress: PropTypes.number.isRequired,
}
FileUploading.defaultProps = {
  width: 300,
}
export default FileUploading
