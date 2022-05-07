import _ from 'src/utils/_'
import { axios } from 'src/utils/axios'

const baseUrl = 'https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/constants'

/**
 * 生成随机用户信息 (昵称和头像)
 * @returns 信息
 */
export async function genRandomUserInfo () {
  const names: string[] = await axios(`${baseUrl}/defaultNames.json`).then(res => res.data)
  const avatars: string[] = await axios(`${baseUrl}/defaultAvatars.json`).then(res => res.data)
  const randomIndex = _.random(10000)
  return {
    name: names[randomIndex % names.length],
    avatarImageUrl: avatars[randomIndex % avatars.length],
  }
}
