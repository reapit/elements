import { useMemo } from 'react'

export const generateRandomId = (): string => {
  try {
    const randomId = `random-${Math.random().toString(36).substring(7)}`
    const isTest = window?.process?.env?.NODE_ENV === 'test'
    return isTest ? 'test-static-id' : randomId
  } catch (e) {
    return ''
  }
}

export const useId = (id?: string): string => {
  const randomId = useMemo(() => {
    if (id) return id
    return generateRandomId()
  }, [id])

  return randomId
}
