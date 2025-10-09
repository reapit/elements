import { describe, it, expect } from 'vitest'
import { getInitialSelected, getTotalOptions } from '../helper' // adjust path
import { ExperimentalSelectCustomOption } from '../option'
import { ExperimentalSelectCustomOptionGroup } from '../group'

describe('SelectCustom utils', () => {
  describe('getInitialSelected', () => {
    it('returns selected options for single select', () => {
      const children = [
        <ExperimentalSelectCustomOption key="1" value="1" label="One" selected />,
        <ExperimentalSelectCustomOption key="2" value="2" label="Two" />,
      ]
      const selected = getInitialSelected(children, false)
      expect(selected).toEqual([{ value: '1', label: 'One' }])
    })

    it('returns multiple selected options for multiple select', () => {
      const children = [
        <ExperimentalSelectCustomOption key="1" value="1" label="One" selected />,
        <ExperimentalSelectCustomOption key="2" value="2" label="Two" selected />,
      ]
      const selected = getInitialSelected(children, true)
      expect(selected).toEqual([
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ])
    })

    it('traverses groups recursively', () => {
      const children = (
        <ExperimentalSelectCustomOptionGroup label="Group 1">
          <ExperimentalSelectCustomOption value="1" label="One" selected />
          <ExperimentalSelectCustomOption value="2" label="Two" />
          <ExperimentalSelectCustomOptionGroup label="Nested Group">
            <ExperimentalSelectCustomOption value="3" label="Three" selected />
          </ExperimentalSelectCustomOptionGroup>
        </ExperimentalSelectCustomOptionGroup>
      )
      const selected = getInitialSelected(children, true)
      expect(selected).toEqual([
        { value: '1', label: 'One' },
        { value: '3', label: 'Three' },
      ])
    })
  })

  describe('getTotalOptions', () => {
    it('counts flat options', () => {
      const children = [
        <ExperimentalSelectCustomOption key="1" value="1" label="One" />,
        <ExperimentalSelectCustomOption key="2" value="2" label="Two" />,
      ]
      expect(getTotalOptions(children)).toBe(2)
    })

    it('counts options inside groups recursively', () => {
      const children = (
        <ExperimentalSelectCustomOptionGroup label="Group 1">
          <ExperimentalSelectCustomOption value="1" label="One" />
          <ExperimentalSelectCustomOption value="2" label="Two" />
          <ExperimentalSelectCustomOptionGroup label="Nested Group">
            <ExperimentalSelectCustomOption value="3" label="Three" />
          </ExperimentalSelectCustomOptionGroup>
        </ExperimentalSelectCustomOptionGroup>
      )
      expect(getTotalOptions(children)).toBe(3)
    })

    it('returns 0 when no options', () => {
      const children = (
        <ExperimentalSelectCustomOptionGroup label="Empty Group">{null}</ExperimentalSelectCustomOptionGroup>
      )
      expect(getTotalOptions(children)).toBe(0)
    })

    it('detects all options selected (to disable select)', () => {
      const children = [
        <ExperimentalSelectCustomOption key="1" value="1" label="One" selected />,
        <ExperimentalSelectCustomOption key="2" value="2" label="Two" selected />,
      ]

      const totalOptions = getTotalOptions(children)
      const initialSelected = getInitialSelected(children, true)

      expect(initialSelected.length).toBe(totalOptions)
      expect(initialSelected.length).toBe(2)
      expect(totalOptions).toBe(2)
    })
  })
})
