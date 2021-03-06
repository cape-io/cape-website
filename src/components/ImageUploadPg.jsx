import React, { PropTypes } from 'react'
import { map } from 'lodash'
// import css from '../style'
import Page from './Page'
import DropZone from './FileUpload/DropZoneContainer'

function getSrc(url) {
  return `${url}?crop=entropy&fit=crop&h=100&w=100`
}

function ImageUploadPg({ collectionId, images, handleUpload }) {
  return (
    <Page className="App">
      <h1>Upload an image</h1>
      <DropZone accept="image/jpeg" collectionId={collectionId} onDrop={handleUpload} />
      {images && map(images, ({ url, name }, key) => (
        url ? <img alt={name} key={key} src={getSrc(url)} /> : <span key={key}>{name}</span>
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
