import { flow, partial } from 'lodash'
import { pick } from 'lodash/fp'
import { clear, onBlur, saveProgress } from 'redux-field'
import { structuredSelector } from 'cape-select'

import { omitFile } from '../components/FileUpload/dropZoneUtils'
import { loadSha } from '../components/FileUpload/processFile'
import * as firebase from '../fire'
import { entitySet, entityUpdate } from '../fire/util'

const { storage } = firebase

export const collectionId = 'file'
// export const debugReturn = (item) => { console.log(item); return item }
export const onProgress = dispatch => flow(
  pick(['bytesTransferred', 'totalBytes']), partial(saveProgress, collectionId), dispatch
)
const cdnUrl = 'http://cape-f.imgix.net/'
export const onComplete = (dispatch, { id, fileName, type }) => () => {
  dispatch(clear(collectionId))
  entityUpdate(firebase, { id, type, url: cdnUrl + fileName })
  // console.log('done', getFileUrl(fileName))
}

export const uploadFile = dispatch => ({ file, ...fileInfo }) => {
  const { contentSha1, fileName } = fileInfo
  const entity = { ...fileInfo, id: contentSha1, type: 'MediaObject' }
  entitySet(firebase, entity)
  // @TODO Make sure there isn't already this file in the database.
  const uploadTask = storage.child(fileName).put(file)
  uploadTask.on('state_changed',
    onProgress(dispatch), console.error, onComplete(dispatch, entity)
  )
  return uploadTask
}
export const handleUpload = file => (dispatch) => {
  dispatch(onBlur(collectionId, omitFile(file)))
  if (file) loadSha(file, uploadFile(dispatch))
  // Upload file
  console.log(file)
}

export const imageSelector = structuredSelector({
  collectionId,
})
