<template>
    <div>
        <h2>{{msg}}</h2>
        <p>报名页面内容</p>
        <button @click="postApply">我要报名</button>
    </div>
</template>

<script>

export default {
  name: 'ActivityApply',
  data () {
    return {
      formData: {
        username: '',
        mobile: ''
      },
      rightsList: []
    }
  },
  methods: {
    postApply () {
      console.log('开始请求')
      this.$http.post('/applyer/list?queryParmas=&page_num=1&page_size=20', {}).then((res) => {
        // 请求成功
        console.log('请求成功')
        console.log(res)
      })
      // axios.post('/applyer/list?queryParmas=&page_num=1&page_size=20', {
      //   username: this.formData.username,
      //   password: this.formData.mobile
      // })
      //   .then(res => {
      //     console.log(res.data)
      //   })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
