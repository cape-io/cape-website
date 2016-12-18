import { connect } from 'react-redux'
import {
  flow, filter, get, memoize, method, omit, overArgs, partial, property,
} from 'lodash'
import { at, getOr } from 'lodash/fp'
import { mapDispatchToProps } from 'cape-redux'
import { mapPartial, selectForm } from 'redux-field'

// @TODO Default values needed for prefixProps? Not for now.
// Create builder that accepts prefixProps array if required.

export const prefixProps = ['collectionId', 'fieldId']
export const getEntityPrefix = flow(at(prefixProps), filter)
export const getFieldState = overArgs(get, [selectForm, getEntityPrefix])
export const getFieldProp = flow(property, partial(flow, getFieldState))
export const getFieldPropOr = flow(getOr, partial(flow, getFieldState))

export const cacheKey = flow(getEntityPrefix, method('join', '-'))
export const createGetActions = actions => flow(
  getEntityPrefix,
  memoize(mapPartial(actions), cacheKey)
)

export const getActions = flow(createGetActions, mapDispatchToProps)
// Remove the props used to create the redux-field prefix.
export function mergeProps(stateProps, dispatchProps, ownProps) {
  const props = omit(ownProps, prefixProps)
  return Object.assign(props, stateProps, dispatchProps)
}
// modify actionObject and add our custom mergeProps onto standard redux connect().
export const createConnect = (mapStateToProps, actionObject) => connect(
  mapStateToProps, getActions(actionObject), mergeProps
)
