<template>
    <div>
        <h2>{{msg}}</h2>
        <p>报名页面内容</p>
    </div>
</template>

<script>
export default {
  name: 'Apply',
  data () {
    return {
      msg: 'Welcome to Watsons App'
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
