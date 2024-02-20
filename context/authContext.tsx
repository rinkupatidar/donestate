import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { createContext, useEffect, useMemo, useState } from 'react'
import { checkUserSession } from 'service/authService'
import {
    AXIOS_INSTANCE,
    IS_CLIENT,
    LOCAL_STORAGE_TOKEN_KEY,
    ROUTES
} from '../constants'

interface authContextInterface {
  token: string
  login: (token: string) => void
  isLoggedIn: boolean
  logout: () => void
}

let initialState = ''
if (IS_CLIENT && localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
  initialState = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)!

export const authContext = createContext<Partial<authContextInterface>>({})
export const AuthProvider = ({ children }: any) => {
  const router = useRouter()
  const [token, setToken] = useState<string>(initialState)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useQuery(['check user session'], () => checkUserSession(token), {
    enabled: !!token,
    onSuccess: ({ response_code }) => {
      if (+response_code === 401) logout()
    },
  })

  useEffect(() => {
    setIsLoggedIn(!!token)
  }, [token])

  useEffect(() => {
    return () => {
      AXIOS_INSTANCE.interceptors.request.eject(axiosReqIns)
    }
  }, [token])

  const axiosReqIns = useMemo(
    () =>
      AXIOS_INSTANCE.interceptors.request.use((config) => {
        if (token) config.headers!.X_AUTH_TOKEN = token
        return config
      }),
    [token]
  )

  useMemo(() => {
    const ins = AXIOS_INSTANCE.interceptors.response.use(
      (config) => config,
      async (error) => {
        const status = error.response.status
        if (status === 401) logout()
        else if (status === 403) logout()
        else if (status === 400) router.push(ROUTES.BAD_REQUEST)
        return Promise.reject(error)
      }
    )
    return () => AXIOS_INSTANCE.interceptors.response.eject(ins)
  }, [token])

  const login = (token: string) => {
    setToken(token)
    setIsLoggedIn(true)
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
  }
  const logout = () => {
    setToken('')
    setIsLoggedIn(false)
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    router.push(ROUTES.LOGIN)
  }

  return (
    <authContext.Provider value={{ token, login, isLoggedIn, logout }}>
      {children}
    </authContext.Provider>
  )
}
