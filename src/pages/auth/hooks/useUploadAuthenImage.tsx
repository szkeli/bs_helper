import { gql, useLazyQuery } from '@apollo/client'
import Taro from '@tarojs/taro'
import { useCallback } from 'react'

import COSAuth from 'src/utils/COSAuth'

export function useUploadAuthenImages () {
  const [execute] = useLazyQuery(gql`
    query UploadAuthenUserImagesInfo($fileNames: [String!]!) {
      info: getAuthenUserImagesUploadCredentialInfo(fileNames: $fileNames) {
        startTime
        expiredTime
        expiration
        sessionToken
        tmpSecretId
        tmpSecretKey
        bucket
        region
        keys
      }
    }
  `)

  return useCallback(async (tempFilePaths: string[]) => {
    if (tempFilePaths.length === 0) return []

    const fileNames = tempFilePaths.map(p => p.substring(p.lastIndexOf('/') + 1))
    const { data, error } = await execute({ variables: { fileNames } })
    if (!data) throw error!
    const baseUrl = `https://${data.info.bucket}.cos.${data.info.region}.myqcloud.com`

    return await Promise.all(tempFilePaths.map(async (tempFilePath, index) => {
      await Taro.uploadFile({
        url: baseUrl,
        name: 'file',
        filePath: tempFilePath,
        formData: {
          key: data.info.keys[index],
          success_action_status: 200,
          Signature: COSAuth({
            SecretId: data.info.tmpSecretId,
            SecretKey: data.info.tmpSecretKey,
            Method: 'POST',
            Pathname: '/',
          }),
          'x-cos-security-token': data.info.sessionToken,
        },
      })

      return `${baseUrl}/${data.info.keys[index]}`
    }))
  }, [execute])
}
