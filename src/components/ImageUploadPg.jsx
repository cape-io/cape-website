import React from 'react'
// import css from '../style'
import Page from './Page'
import DropZone from './ImageUpload/DropZoneContainer'

function ImageUploadPg() {
  return (
    <Page className="App">
      <h1>Upload an image</h1>
      <DropZone accept="image/jpeg" collectionId="file" onDrop={console.log} />
    </Page>
  )
}
ImageUploadPg.propTypes = {
}
export default ImageUploadPg
