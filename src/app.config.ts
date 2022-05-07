export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/auth/auth',
    'pages/agreement/agreement',
    'pages/customer-service/customer-service',
    'pages/web/web',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  useExtendedLib: {
    weui: true,
  },
})
