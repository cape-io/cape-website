import { onBlur } from 'redux-field'
import { structuredSelector } from 'cape-select'

import { omitFile } from '../components/FileUpload/dropZoneUtils'

export const collectionId = 'file'
export const handleUpload = file => (dispatch) => {
  dispatch(onBlur(collectionId, omitFile(file)))
  // Upload file
  console.log(file)
}
export const imageSelector = structuredSelector({
  collectionId,
})
