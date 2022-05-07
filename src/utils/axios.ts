import Taro from '@tarojs/taro'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import querystring from 'querystring'

axios.defaults.adapter = async function <Result, Data>(
  config: AxiosRequestConfig<Data>,
) {
  let url = config.url!
  if (config.params) {
    url += `?${querystring.stringify(config.params)}`
  }

  return await new Promise(
    (
      resolve: (value: AxiosResponse<Result, Data>) => void,
      reject: (reason: AxiosError) => void,
    ) => {
      void Taro.request({
        url: url,
        method: config.method?.toUpperCase() as keyof Taro.request.Method,
        data: config.data,
        header: config.headers,
      })
        .then(res => {
          console.log({ req: config, res: res })
          const axiosRes: AxiosResponse<Result, Data> = {
            data: res.data,
            status: res.statusCode,
            statusText: 'todo', // StatusText[res.statusCode] as string,
            headers: res.header,
            config,
          }
          if (res.statusCode < 400) {
            resolve(axiosRes)
          } else {
            const axiosErr: AxiosError<Result, Data> = {
              name: '',
              message: '',
              config,
              response: axiosRes,
              isAxiosError: true,
              toJSON: async () => res,
            }
            reject(axiosErr)
          }
        })
        .catch(err => {
          console.error(err)
          const axiosErr: AxiosError = {
            name: '',
            message: '',
            config,
            isAxiosError: false,
            toJSON: () => err,
          }
          reject(axiosErr)
        })
    },
  )
}

async function axiosFetch(input: any, init: any): Promise<any> {
  const { data, status, statusText } = await axios({
    url: input,
    headers: init.headers,
    method: init.method,
    data: init.body,
  })
  return {
    ok: () => status >= 200 && status < 300,
    status: () => status,
    statusText: () => statusText,
    text: () => Promise.resolve(JSON.stringify(data)),
    json: () => Promise.resolve(data),
  }
}

export { axios, axiosFetch }
