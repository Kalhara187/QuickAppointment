import { useState, useCallback } from 'react'

interface UseAsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error'
  data: T | null
  error: Error | null
}

export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [state, setState] = useState<UseAsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ status: 'pending', data: null, error: null })
    try {
      const response = await asyncFunction()
      setState({ status: 'success', data: response, error: null })
      return response
    } catch (error) {
      setState({ status: 'error', data: null, error: error as Error })
      throw error
    }
  }, [asyncFunction])

  // Call execute on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}

export default useAsync
