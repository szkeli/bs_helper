const path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"development"',
    API_URL: '"https://dev.szlikeyou.com/graphql"',
    API_WS_URL: '"wss://dev.szlikeyou.com/graphql"',
    SZU_URL: '"https://service-hnkhni0a-1306842204.gz.apigw.tencentcs.com/test"'
    // SZU_URL: '"http://localhost:9000"'
  },
  plugins: [
    // prod 下 Taro 3 会自带一个 Terser，这里是为了 dev 下编译出来的代码不超过 2M，可以手机预览。
    path.resolve('./plugins/terser.ts')
  ],
  defineConstants: {},
  mini: {},
  h5: {}
}
