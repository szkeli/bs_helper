import { IPluginContext } from '@tarojs/service'
import { TaroWeappTailwindcssWebpackPluginV4 } from 'weapp-tailwindcss-webpack-plugin'

export default (ctx: IPluginContext, _) => {
  ctx.modifyWebpackChain(({ chain }) => {
    chain
      .plugin('TaroWeappTailwindcssWebpackPluginV4')
      .use(TaroWeappTailwindcssWebpackPluginV4, [{ framework: 'react' }])
  })
}
