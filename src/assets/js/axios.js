import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://api.wuxuwei.vip/watsons/api' : '/api'
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 设置超时
axios.defaults.timeout = 10000
// 挂载到原型对象之前 先设置拦截器 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  // 在 request 拦截器中， 展示进度条 NProgress.start()
  // 为请求头对象添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后都必须 return config
  return config
}, error => {
  return Promise.reject(error)
})

// 在 response 拦截器中， 隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  return config
}, response => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  console.error(JSON.stringify(error))
})

export default {
  post (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: JSON.stringify(data)
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  postFile (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: data,
        contentType: false,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  get (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
