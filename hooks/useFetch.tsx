import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { AXIOS_INSTANCE } from '../constants'

function useFetch<G, Q = {}>(
  url: string,
  query: Q,
  config: {
    initialData?: G
    shouldFetch?: boolean
    shouldShowLoadingOnRefetch?: boolean
    initialLoadingState?: boolean
    handleResponse?: (val: G, query?: Q) => G
  } = {}
): [G, boolean, (data: G) => void] {
  const {
    initialData,
    shouldFetch = true,
    handleResponse,
    shouldShowLoadingOnRefetch = false,
    initialLoadingState = true,
  } = config

  const [State, _setState] = useState<{ data: G; isLoading: boolean }>({
    isLoading: initialLoadingState,
    data: initialData as G,
  })
  const setState = (data: G) => {
    _setState({
      ...State,
      data: data,
    })
  }

  useDeepCompareEffect(() => {
    if (shouldFetch) {
      if (shouldShowLoadingOnRefetch)
        _setState({ isLoading: true, data: State.data })
      AXIOS_INSTANCE.get(url, { params: query })
        .then((res) => {
          let data = res.data
          if (handleResponse) data = handleResponse(data, query)
          _setState({
            isLoading: false,
            data,
          })
        })
        .catch((err) => {})
    }
  }, [shouldFetch, query])

  return [State.data, State.isLoading, setState]
}
export default useFetch
