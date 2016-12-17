import { flow, partial } from 'lodash'
import { pick } from 'lodash/fp'
import { clear, onBlur, saveProgress } from 'redux-field'
import { structuredSelector } from 'cape-select'

import { omitFile } from '../components/FileUpload/dropZoneUtils'
import { loadSha } from '../components/FileUpload/processFile'
import { getFileUrl, storage } from '../fire'

export const collectionId = 'file'
// export const debugReturn = (item) => { console.log(item); return item }
export const onProgress = dispatch => flow(
  pick(['bytesTransferred', 'totalBytes']), partial(saveProgress, collectionId), dispatch
)
export const onComplete = (dispatch, { fileName }) => () => {
  dispatch(clear(collectionId))
  console.log('done', getFileUrl(fileName))
}

export const uploadFile = dispatch => (fileInfo) => {
  const { file, fileName } = fileInfo
  const uploadTask = storage.child(fileName).put(file)
  uploadTask.on('state_changed',
    onProgress(dispatch), console.error, onComplete(dispatch, fileInfo)
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
