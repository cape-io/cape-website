import { structuredSelector } from 'cape-select'
import { onBlur, onChange, onDragEnter, onDragLeave } from 'redux-field'
import { createConnect, getFieldProp, getFieldPropOr } from '../capeField'
import Component from './DropZone'

export const mapStateToProps = structuredSelector({
  hasBlur: getFieldPropOr(false, 'blur'),
  hasHover: getFieldPropOr(false, 'focus'),
  isSaving: getFieldPropOr(false, 'isSaving'),
  savedProgress: getFieldPropOr(0, 'savedProgress'),
  value: getFieldProp('value'),
})

const actions = {
  onBlur,
  onChange,
  onDragEnter,
  onDragLeave,
}

export default createConnect(mapStateToProps, actions)(Component)
