import sha1Hash from 'simple-sha1'
import { flow, last, partial, toLower } from 'lodash'
import { at, join, split } from 'lodash/fp'
import { doProp, set, setField } from 'cape-lodash'

/* global window */

export const extConvert = {
  jpg: 'jpeg',
  yml: 'yaml',
}
export function convertExt(ext) { return extConvert[ext] || ext }
export const getExt = flow(split('.'), last, toLower, convertExt)
export const setExt = setField('ext', doProp(getExt, 'name'))
export const getFileName = flow(at(['contentSha1', 'ext']), join('.'))
export const setFileName = setField('fileName', getFileName)
export const setFields = flow(setExt, setFileName)
export function loadSha(file, next) {
  const reader = new window.FileReader()
  reader.onloadend = () => sha1Hash(reader.result, flow(
    partial(set, file, 'contentSha1'), setFields, next
  ))
  reader.readAsArrayBuffer(file.file)
}
// export const fileName = over()
