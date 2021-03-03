import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'  
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'

// 导入阿里字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return一个config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(elementUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
