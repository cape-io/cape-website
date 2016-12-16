import { structuredSelector } from 'cape-select'
import { onBlur, onChange, onDragEnter, onDragLeave } from 'redux-field'
import { createConnect, getFieldPropOr } from '../capeField'
import Component from './DropZone'

export const mapStateToProps = structuredSelector({
  hasHover: getFieldPropOr(false, 'focus'),
})

const actions = {
  onBlur,
  onChange,
  onDragEnter,
  onDragLeave,
}

export default createConnect(mapStateToProps, actions)(Component)
