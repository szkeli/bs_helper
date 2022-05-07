import { IPluginContext } from '@tarojs/service'
import path from 'path'

export default (ctx: IPluginContext, _) => {
  ctx.modifyWebpackChain(({ chain }) => {
    chain.resolve.alias.set('src', path.resolve('./src'))
    chain.resolve.extensions.prepend('.mjs')
  })
}
