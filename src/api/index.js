import axios from '@/assets/js/axios'

const postApply = (query) => {
  return axios.post('/applyer', query)
}

const getApplyList = (query) => {
  return axios.post('/applyer/list', query)
}

export default {
  postApply,
  getApplyList
}
