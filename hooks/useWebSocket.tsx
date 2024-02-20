import { CompatClient, Stomp } from '@stomp/stompjs'
import { useContext, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import { authContext } from '../context/authContext'

export default function useWebsocket<T>(subscribeUrl: string): [T | undefined] {
  const { token } = useContext(authContext)
  const [state, setState] = useState<T | undefined>()
  const stompClient = useRef<CompatClient>()
  const headers = { X_AUTH_TOKEN: token }

  useEffect(() => {
    const socket = new SockJS('https://api.donestat.co/ws')
    stompClient.current = Stomp.over(socket)
    stompClient.current.reconnect_delay = 5000
    stompClient.current.connect(headers, onConnect, onErr)

    return () => {
      stompClient.current?.disconnect()
    }
  }, [subscribeUrl])

  function onConnect(res: any) {
    stompClient.current!.subscribe(
      subscribeUrl,
      (message) => {
        setState(JSON.parse(message.body))
      },
      headers
    )
  }
  function onErr(res: any) {
    console.log({ res })
  }
  return [state]
}
