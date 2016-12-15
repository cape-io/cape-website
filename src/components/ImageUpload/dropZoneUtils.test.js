import { fileMeta, getAcceptChecker, getFile, onlyFirst } from './dropZoneUtils'

/* global describe it expect */
describe('onlyFirst', () => {
  it('is true when index is 0', () => {
    expect(onlyFirst({ index: 0 })).toBe(true)
    expect(onlyFirst({ index: 1 })).toBe(false)
    expect(onlyFirst({ index: 2 })).toBe(false)
  })
})
const file = {
  lastModified: 1481652283000,
  lastModifiedDate: new Date(),
  name: 'DecPg.pdf',
  size: 151195,
  type: 'application/pdf',
}
describe('fileMeta', () => {
  const meta = fileMeta(file, 0)
  it('creates a new object with file as a field', () => {
    expect(meta.file).toBe(file)
  })
  it('adds an index property', () => {
    expect(meta.index).toBe(0)
    expect(fileMeta(file, 1).index).toBe(1)
  })
})
const files = [
  fileMeta(file),
  fileMeta({ ...file, name: 'One.pdf' }, 1),
  fileMeta({ ...file, name: 'Two.pdf' }, 2),
]
describe('getAcceptChecker', () => {
  const props = { multiple: true }
  const checker = getAcceptChecker(props)
  it('should return a func after sending props', () => {
    expect(typeof checker).toBe('function')
  })
  it('returns true on the first element', () => {
    const res = checker(files[0])
    expect(res).toBe(true)
  })
  it('multiple returns true after first el', () => {
    expect(checker(files[1])).toBe(true)
    expect(checker(files[2])).toBe(true)
  })
  it('returns false after first el when no multiple', () => {
    const checker2 = getAcceptChecker({})
    expect(checker2(files[0])).toBe(true)
    expect(checker2(files[1])).toBe(false)
    expect(checker2(files[2])).toBe(false)
  })
})

describe('getFile', () => {
  const func = getFile({})
  it('should return a func after sending props', () => {
    expect(typeof func).toBe('function')
  })
  it('sets isAccepted only true on first file', () => {
    expect(func(file)).toEqual({ ...files[0], isAccepted: true })
    expect(func(file, 1).isAccepted).toBe(false)
    expect(func(file, 2).isAccepted).toBe(false)
  })
  const func2 = getFile({ multiple: true })
  it('true on all file when multiple', () => {
    expect(func2(file)).toEqual({ ...files[0], isAccepted: true })
    expect(func2(file, 1).isAccepted).toBe(true)
    expect(func2(file, 2).isAccepted).toBe(true)
  })
})
