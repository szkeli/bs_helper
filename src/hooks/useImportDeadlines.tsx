import Taro from '@tarojs/taro'
import { useCallback } from 'react'

import { useGlobal } from 'src/stores/useGlobal'
import { axios } from 'src/utils/axios'

export function useImportDeadlines () {
  const { setDeadlines } = useGlobal()

  return useCallback(async (account: { username: string, password: string }) => {
    await Taro.showLoading({ title: '导入任务中' })

    try {
      const deadlines = await szuDeadlines(account.username, account.password)
      setDeadlines(deadlines)
      Taro.hideLoading()
      void Taro.showToast({ title: '导入成功', icon: 'success' })
    } catch (err) {
      Taro.hideLoading()
      void Taro.showToast({ title: '导入失败', icon: 'error' })
    }
  }, [setDeadlines])
}

async function szuDeadlines (username: string, password: string) {
  const cookieMap = await axios({
    url: `${process.env.SZU_URL}/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { username, password },
  }).then(res => res.data)

  const data = await axios({
    url: `${process.env.SZU_URL}/deadlines`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { cookieMap, start: Date.now() - 7 * 24 * 60 * 60 * 1000 },
  }).then(res => res.data)

  return data
}
