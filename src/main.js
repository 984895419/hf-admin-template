import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import i18n from './lang' // internationalization
import router from './router'
import './icons' // icon
import './permission' // permission control
import { hasPermission, hasPermMenu } from './utils/permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import commonUtils from '@/utils/commonUtil'
import constVal from '@/utils/constVal'
import pubSubUtils from './utils/PubSubUtils'
import ExTableColumn from '@/utils/ExTableColumn'
import Print from '@/utils/print'
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
Vue.prototype.$constVal = constVal
Vue.prototype.$util = commonUtils
Vue.prototype.$pubSub = pubSubUtils
// 全局的常量
Vue.prototype.hasPerm = hasPermission
Vue.prototype.hasPermMenu = hasPermMenu

Vue.use(Print)
Vue.use(SuperFlow)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.component(ExTableColumn.name, ExTableColumn)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
