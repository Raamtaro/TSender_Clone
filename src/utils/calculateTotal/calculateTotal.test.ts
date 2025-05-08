// components/InputField.test.ts
import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculateTotal'

describe('calculateTotal', () => {
  it('returns 0 for an empty string', () => {
    expect(calculateTotal('')).toBe(0)
  })

  it('sums space-delimited numbers', () => {
    expect(calculateTotal('100 200 300')).toBe(600)
  })

  it('sums comma-delimited numbers', () => {
    expect(calculateTotal('100,200,300')).toBe(600)
  })

  it('sums newline-delimited numbers', () => {
    expect(calculateTotal('100\n200\n300')).toBe(600)
  })

  it('handles mixed delimiters', () => {
    expect(calculateTotal('100, 200\n300 400')).toBe(1000)
  })

  it('ignores non-numeric tokens', () => {
    expect(calculateTotal('abc 100, xyz\n50')).toBe(150)
  })

  it('parses floats correctly', () => {
    expect(calculateTotal('1.5,2.5\n3.5')).toBeCloseTo(7.5)
  })

  it('returns 0 when only delimiters are present', () => {
    expect(calculateTotal(' ,  \n\t')).toBe(0)
  })
})
