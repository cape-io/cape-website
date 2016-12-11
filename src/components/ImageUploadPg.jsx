import React from 'react'
import Dropzone from 'react-dropzone'
// import css from '../style'
import Page from './Page'
import DropZone from './ImageUpload/DropZoneContainer'

function ImageUploadPg() {
  return (
    <Page className="App">
      <h1>Upload an image</h1>
      <DropZone collectionId="file" />
      <Dropzone><p>Click here or drop in a new image to upload.</p></Dropzone>
    </Page>
  )
}
ImageUploadPg.propTypes = {
}
export default ImageUploadPg
