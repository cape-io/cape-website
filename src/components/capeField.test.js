/* global describe it expect */

import { getEntityPrefix, getFieldState, getFieldProp } from './capeField'

describe('getEntityPrefix', () => {
  it('returns prefix array', () => {
    expect(getEntityPrefix({ collectionId: 'foo' })).toEqual(['foo'])
    expect(getEntityPrefix({ collectionId: 'foo', fieldId: 'bar' })).toEqual(['foo', 'bar'])
  })
})
const state = { form: { foo: { focus: true, value: 'silly' } } }
describe('getFieldState', () => {
  it('get state of field', () => {
    expect(getFieldState(state, { collectionId: 'foo' })).toBe(state.form.foo)
  })
})
describe('getFieldProp', () => {
  it('get field state prop', () => {
    const selector = getFieldProp('focus')
    expect(typeof selector).toBe('function')
    expect(selector(state)).toBe(undefined)
    expect(selector(state), { collectionId: 'foo' }).toBe(undefined)
    expect(selector(state, { collectionId: 'foo' })).toBe(true)
  })
})
