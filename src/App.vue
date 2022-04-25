<template>
  <div class="container">
      <router-view  v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in" >
          <component :is="Component" />
        </transition>
      </router-view>
  </div>
</template>
<script>
export default {
  mounted () {
    document.getElementById('mainLoading').style.display = 'none'
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/transition.scss';

  #app {
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .container {
      width: 100%;
      height: 100%;
      background-color: rgb(245, 245, 245);
      padding: 0;
      margin: 0;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #333333;
  }

.slide-fade-enter{
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0.2;
}
.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
}
</style>
