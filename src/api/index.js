import axios from '@/assets/js/axios'

const postApply = (query) => {
  return axios.post('/applyer', query)
}

const getApplyList = (query) => {
  return axios.get('/applyer/list', query)
}
// 投票
const vote = (query) => {
  return axios.get('/vote/create', query)
}
// 上传图片
const uploadImage = (query) => {
  return axios.postFile('/qiniu/image', query)
}

export default {
  postApply,
  getApplyList,
  vote,
  uploadImage
}
