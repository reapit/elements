import { describe, it, expect } from 'vitest'
import { getInitialSelected, getTotalOptions } from '../helper' // adjust path
import { Option } from '../option'
import { Group } from '../group'

describe('SelectCustom utils', () => {
  describe('getInitialSelected', () => {
    it('returns selected options for single select', () => {
      const children = [<Option key="1" value="1" label="One" selected />, <Option key="2" value="2" label="Two" />]
      const selected = getInitialSelected(children, false)
      expect(selected).toEqual([{ value: '1', label: 'One' }])
    })

    it('returns multiple selected options for multiple select', () => {
      const children = [
        <Option key="1" value="1" label="One" selected />,
        <Option key="2" value="2" label="Two" selected />,
      ]
      const selected = getInitialSelected(children, true)
      expect(selected).toEqual([
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ])
    })

    it('traverses groups recursively', () => {
      const children = (
        <Group label="Group 1">
          <Option value="1" label="One" selected />
          <Option value="2" label="Two" />
          <Group label="Nested Group">
            <Option value="3" label="Three" selected />
          </Group>
        </Group>
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
      const children = [<Option key="1" value="1" label="One" />, <Option key="2" value="2" label="Two" />]
      expect(getTotalOptions(children)).toBe(2)
    })

    it('counts options inside groups recursively', () => {
      const children = (
        <Group label="Group 1">
          <Option value="1" label="One" />
          <Option value="2" label="Two" />
          <Group label="Nested Group">
            <Option value="3" label="Three" />
          </Group>
        </Group>
      )
      expect(getTotalOptions(children)).toBe(3)
    })

    it('returns 0 when no options', () => {
      const children = <Group label="Empty Group">{null}</Group>
      expect(getTotalOptions(children)).toBe(0)
    })

    it('detects all options selected (to disable select)', () => {
      const children = [
        <Option key="1" value="1" label="One" selected />,
        <Option key="2" value="2" label="Two" selected />,
      ]

      const totalOptions = getTotalOptions(children)
      const initialSelected = getInitialSelected(children, true)

      expect(initialSelected.length).toBe(totalOptions)
      expect(initialSelected.length).toBe(2)
      expect(totalOptions).toBe(2)
    })
  })
})
