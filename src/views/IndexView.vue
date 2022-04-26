<template>
  <div class="cover_bg">
    <div class="ma_logo"><img src="../assets/img/cover_logo.png"/></div>
    <div class="ma_subject magictime puffIn"><img src="../assets/img/cover_subject.png"/></div>
    <div class="ma_slogan"><img src="../assets/img/cover_slogan.png"/></div>
    <div class="ma_start magictimeDelay tinDownIn" @click="gotoGuidView"><img src="../assets/img/cover_btn_start.png"/></div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'IndexView',
  data () {
    return {
      msg: 'Welcome to Watsons'
    }
  },
  methods: {
    gotoGuidView () {
      router.push({ name: 'guid', params: {} })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cover_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/cover_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}

.ma_logo{
  padding-top: 11.5vh;
  width: 45%;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.ma_subject{
  width: 66%;
  margin: 6vh auto;
  img{
    width: 100%;
  }
}

.ma_slogan{
  width: 28%;
  margin: 24vh auto 0 auto;
  img{
    width: 100%;
  }
}

.ma_start{
  margin: 6vh auto;
  opacity: 0;
  width: 40%;
  opacity: 0;
  width: 40%;
  img{
    width: 100%;
  }
}

</style>
