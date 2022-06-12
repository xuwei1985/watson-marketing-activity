import axios from '@/assets/js/axios'

const postApply = (query) => {
  return axios.post('/applyer', query)
}
const postProof = (query) => {
  return axios.post('/mediaProof', query)
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

const getToken = (query) => {
  return axios.get('/qiniu/getToken', query)
}
export default {
  postApply,
  postProof,
  getApplyList,
  vote,
  uploadImage,
  getToken
}
