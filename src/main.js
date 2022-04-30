import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus' // 引入element-plus
import 'element-plus/theme-chalk/index.css' // 引入element-plus的样式

// 导入图片预加载方法以及图片列表
import { imgsPreloader, launchPreloaderList, delayPreloaderList } from '@/assets/js/imgPreloader'

imgsPreloader(launchPreloaderList).then(res => {
  // 关闭加载弹框
  // document.querySelector('.loading').style.display = 'none'
  const app = createApp(App)
  app.use(store).use(router).use(ElementPlus, { zIndex: 3000, size: 'small' }).mount('#app')
  imgsPreloader(delayPreloaderList)
})
