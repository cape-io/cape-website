import React, { PropTypes } from 'react'
// import css from '../style'
import Page from './Page'
import DropZone from './FileUpload/DropZoneContainer'

function ImageUploadPg({ collectionId, handleUpload }) {
  return (
    <Page className="App">
      <h1>Upload an image</h1>
      <DropZone accept="image/jpeg" collectionId={collectionId} onDrop={handleUpload} />
    </Page>
  )
}
ImageUploadPg.propTypes = {
  collectionId: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
}
export default ImageUploadPg
