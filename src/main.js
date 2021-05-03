import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'  
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
// require('script-loader!file-saver')
// require('script-loader!@/excel/Blob')
// require('script-loader!xlsx/dist/xlsx.core.min')

// 导入阿里字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 配置请求的根路径
// 生产环境接口
// axios.defaults.baseURL = 'http://8.136.220.192:8888/'
// 开发环境接口
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
axios.defaults.timeout =  9000
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return一个config
  return config
})
Vue.prototype.$http = axios
if (module.hot) {
  module.hot.accept();
}

Vue.config.productionTip = false
Vue.use(elementUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
