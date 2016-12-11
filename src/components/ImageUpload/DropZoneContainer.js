import { structuredSelector } from 'cape-select'
import { onChange, onDragEnter, onDragLeave } from 'redux-field'
import { createConnect, getFieldPropOr } from '../capeField'
import Component from './DropZone'

export const mapStateToProps = structuredSelector({
  hasHover: getFieldPropOr(false, 'focus'),
})

const actions = {
  onChange,
  onDragEnter,
  onDragLeave,
}

export default createConnect(mapStateToProps, actions)(Component)
