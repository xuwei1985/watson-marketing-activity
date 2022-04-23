<template>
  <div class="cover_bg">
   
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/cover.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f9f9f9;
}
</style>
