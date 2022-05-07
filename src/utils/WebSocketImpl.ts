import Taro from '@tarojs/taro'

export class WebSocketImpl implements WebSocket {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3
  readonly CONNECTING = 0
  readonly OPEN = 1
  readonly CLOSING = 2
  readonly CLOSED = 3

  private socketTask: Taro.SocketTask | undefined

  protocol: string
  binaryType: BinaryType
  bufferedAmount: 0
  extensions: string

  onopen: (this: WebSocket, ev: Event) => any
  onmessage: (this: WebSocket, ev: MessageEvent<any>) => any
  onerror: (this: WebSocket, ev: Event) => any
  onclose: (this: WebSocket, ev: CloseEvent) => any

  constructor(
    readonly url: string,
    readonly protocols: string | string[] = ['graphql-ws'],
  ) {
    this.extensions = ''
    this.binaryType = 'blob'

    /*
      为了模拟 W3C WebSocket 的行为，protocols 的类型必须是 string | string[] | undefined。
      模拟器的 connectSocket 背后是直接就是浏览器的 WebSocket 实现，因此不会出问题。
      然而真机的 connectSocket 的 protocols 类型只能是 string[] | undefined。
      如果传入 string 类型， SocketTask 会瞬间变成 CLOSED 状态。
      所以要兼容真机，这里必须把 string 转换为 string[]。
    */
    if (!Array.isArray(protocols)) protocols = [protocols]

    void Taro.connectSocket({ url, protocols }).then(socketTask => {
      this.socketTask = socketTask
      this.socketTask.onOpen(e => {
        console.log('WebSocket: open', e)
        this.onopen(e as unknown as Event)
      })
      this.socketTask.onError(e => {
        console.log('WebSocket: error', e)
        this.onerror(e as unknown as Event)
      })
      this.socketTask.onClose(e => {
        console.log('WebSocket: close', e)
        this.onclose(e as unknown as CloseEvent)
      })
      this.socketTask.onMessage(e => {
        try {
          const obj = JSON.parse(e.data)
          // 忽略 keepalive 数据包的输出
          if (obj.type !== 'ka') {
            console.log('WebSocket: message', obj)
          }
        } catch (_err) {
          console.log('WebSocket: message', e)
        }
        this.onmessage(e as unknown as MessageEvent)
      })
    })
  }

  get readyState() {
    return this.socketTask?.readyState ?? 0
  }

  close(code?: number, reason?: string) {
    this.socketTask?.close({ code, reason })
  }

  send(data: string) {
    try {
      const obj = JSON.parse(data)
      console.log('WebSocket: send', obj)
    } catch (e) {
      console.log('WebSocket: send', { data })
    }
    this.socketTask?.send({ data })
  }

  ping(data, mask, cb) {
    console.log('WebSocket: not sure how to deal with ping', data, mask, cb)
  }

  pong(data, mask, cb) {
    console.log('WebSocket: not sure how to deal with pong', data, mask, cb)
  }

  terminate() {
    throw new Error('WebSocket: Method not implemented.')
  }

  addEventListener(_type: any, _listener: any, _options: any) {
    throw new Error('WebSocket: Method not implemented.')
  }

  removeEventListener(_type: any, _listener: any, _options: any) {
    throw new Error('WebSocket: Method not implemented.')
  }

  setMaxListeners(_n: number): this {
    throw new Error('WebSocket: Method not implemented.')
  }

  getMaxListeners(): number {
    throw new Error('WebSocket: Method not implemented.')
  }

  rawListeners(_event: string | symbol): Function[] {
    throw new Error('WebSocket: Method not implemented.')
  }

  prependListener(
    _event: string | symbol,
    _listener: (...args: any[]) => void,
  ): this {
    throw new Error('WebSocket: Method not implemented.')
  }

  prependOnceListener(
    _event: string | symbol,
    _listener: (...args: any[]) => void,
  ): this {
    throw new Error('WebSocket: Method not implemented.')
  }

  dispatchEvent(_event: Event): boolean {
    throw new Error('WebSocket: Method not implemented.')
  }
}
