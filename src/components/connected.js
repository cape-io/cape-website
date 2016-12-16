import { connect } from 'react-redux'
import { menuActions, menuSelector } from '../select/menu'
import { imageSelector, handleUpload } from '../select/image'

import MenuEl from './Menu'
import ImageUploadPg from './ImageUploadPg'

export const ImageUpload = connect(imageSelector, { handleUpload })(ImageUploadPg)
export const Menu = connect(menuSelector, menuActions)(MenuEl)
