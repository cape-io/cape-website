import { getAcceptChecker, onlyFirst } from './dropZoneUtils'

/* global describe it expect */
describe('onlyFirst', () => {
  it('is true when index is 0', () => {
    expect(onlyFirst(true, 0)).toBe(true)
    expect(onlyFirst({}, 1)).toBe(false)
    expect(onlyFirst(null, 2)).toBe(false)
  })
})
describe('getAcceptChecker', () => {
  const files = [
    { type: 'application/pdf', name: 'One.pdf' },
    { type: 'application/pdf', name: 'Two.pdf' },
  ]
  it('multiple returns true after first el', () => {
    const props = { multiple: true }
    const checker = getAcceptChecker(props)
    expect(typeof checker).toBe('function')
    const res = checker(files[0], 0)
    expect(typeof res).toBe('boolean')
    expect(res).toBe(true)
    const res2 = checker(files[1], 1)
    expect(res2).toBe(true)
  })
  it('returns false after first el when no multiple', () => {
    const checker2 = getAcceptChecker({})
    expect(checker2(null, 0)).toBe(true)
    expect(checker2(files[1], 1)).toBe(false)
    expect(checker2(files[0], 2)).toBe(false)
  })
})
const file = {
  lastModified: 1481652283000,
  lastModifiedDate: new Date(),
  name: 'DecPg.pdf',
  size: 151195,
  type: 'application/pdf',
}
