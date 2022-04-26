import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入图片预加载方法以及图片列表
import { imgsPreloader, launchPreloaderList, delayPreloaderList } from '@/assets/js/imgPreloader'

imgsPreloader(launchPreloaderList).then(res => {
  // 关闭加载弹框
  // document.querySelector('.loading').style.display = 'none'
  const app = createApp(App)
  app.use(store).use(router).mount('#app')

  imgsPreloader(delayPreloaderList)
})
