import { AXIOS_INSTANCE } from '../constants'

export const checkUserSession = (token: string) =>
  AXIOS_INSTANCE.post<{
    response_code: number
  }>('checkUserSession', { token }).then((res) => res.data)
