<template>
  <div class="container">
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted () {
    // document.getElementById('mainLoading').style.display = 'none'
  }
}
</script>

<style lang="scss">
  // @import '@/assets/css/base.css';
  @import '@/assets/css/magic.min.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    width: 100%;
    height: 100%;
  }

 *{
      padding: 0;
      margin: 0;
  }

  body,html{
      width: 100%;
      height: 100%;
  }

  .container {
      width: 100%;
      height: 100%;
      background-color: rgb(235, 235, 235);
      padding: 0;
      margin: 0;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #333333;
  }

  img{border: 0;}
</style>
