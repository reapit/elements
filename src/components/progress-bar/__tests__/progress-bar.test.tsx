import { render } from '@testing-library/react'
import {
  ProgressBarPercentage,
  ProgressBarSteps,
  ProgressBarContainer,
  ProgressBarInner,
  ProgressBarItem,
  handleSetPercentageComplete,
  handleSetPercentageCompleteSteps,
} from '../progress-bar'

describe('ProgressBarContainer', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ProgressBarContainer />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ProgressBarInner', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ProgressBarInner />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ProgressBarItem', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ProgressBarItem />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ProgressBarPercentage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ProgressBarPercentage duration={20} />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ProgressBarSteps', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ProgressBarSteps numberSteps={10} currentStep={5} />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('handleSetPercentageComplete', () => {
  it('should call window set interval and clear interval', () => {
    const intervalSpy = vi.spyOn(window, 'setInterval')
    const clearSpy = vi.spyOn(window, 'clearInterval')
    const mockSetPercentComplete = vi.fn()
    const mockIntervalTime = 20

    const curried = handleSetPercentageComplete(mockSetPercentComplete, mockIntervalTime)
    const interval = curried()

    expect(intervalSpy).toHaveBeenCalledTimes(1)

    interval()

    expect(clearSpy).toHaveBeenCalledTimes(1)
  })
})

describe('handleSetPercentageCompleteSteps', () => {
  it('should call setPercentageComplete with correct time', () => {
    const mockSetPercentComplete = vi.fn()
    const mockNumberSteps = 20
    const mockCurrentStep = 20

    const curried = handleSetPercentageCompleteSteps(mockSetPercentComplete, mockCurrentStep, mockNumberSteps)

    curried()

    expect(mockSetPercentComplete).toHaveBeenCalledTimes(1)
    expect(mockSetPercentComplete).toHaveBeenCalledWith((mockCurrentStep / mockNumberSteps) * 100)
  })
})
