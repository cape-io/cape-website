import React, { PropTypes } from 'react'
import { map } from 'lodash'
// import css from '../style'
import Page from './Page'
import DropZone from './FileUpload/DropZoneContainer'

function getSrc(url) {
  return `${url}?w=200`
}

function ImageUploadPg({ collectionId, images, handleUpload }) {
  return (
    <Page className="App">
      <h1>Upload an image</h1>
      <DropZone accept="image/jpeg" collectionId={collectionId} onDrop={handleUpload} />
      {images && map(images, ({ url, name }, key) => (
        url ? <img alt={name} key={key} src={getSrc(url)} /> : <div key={key}>{name}</div>
      ))}
    </Page>
  )
}
ImageUploadPg.propTypes = {
  collectionId: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
  images: PropTypes.array,
}
export default ImageUploadPg
