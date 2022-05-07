import { IPluginContext } from '@tarojs/service'
import TerserPlugin from 'terser-webpack-plugin'

export default (ctx: IPluginContext, _) => {
  ctx.modifyWebpackChain(({ chain }) => {
    chain.merge({
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: [
              'common.js',
              'taro.js',
              'vendors.js',
              'app.js',
              'network.js',
              'pages/index/index.js',
              'pages/auth/auth.js',
              'pages/agreement/agreement.js',
              'pages/customer-service/customer-service.js',
              'pages/web/web.js',
            ],
            parallel: true,
            // minify: TerserPlugin.swcMinify,
            extractComments: true,
            terserOptions: {
              parse: {
                ecma: 2020,
              },
              compress: {
                ecma: 5,
                arrows: false,
                collapse_vars: false,
                comparisons: false,
                computed_props: false,
                hoist_funs: false,
                hoist_props: false,
                hoist_vars: false,
                inline: false,
                loops: false,
                negate_iife: false,
                properties: false,
                reduce_funcs: false,
                reduce_vars: false,
                switches: false,
                toplevel: false,
                typeofs: false,
                booleans: true,
                if_return: true,
                sequences: true,
                unused: true,
                conditionals: true,
                dead_code: true,
                evaluate: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
          }),
        ],
      },
    })
  })
}
