// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

import { HappyScroll } from 'vue-happy-scroll'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VideoPlayer)
// 自定义组件名
Vue.component('happy-scroll', HappyScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
