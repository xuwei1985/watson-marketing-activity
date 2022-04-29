<template>
  <div class="cover_bg">
    <div class="ma_logo"><img src="../assets/img/cover_logo.png"/></div>
    <div class="ma_subject magictime puffIn"><img src="../assets/img/cover_subject.png"/></div>
    <div class="ma_slogan"><img src="../assets/img/cover_slogan.png"/></div>
    <div class="ma_start magictimeDelay tinDownIn" @click="gotoGuideView"><img src="../assets/img/cover_btn_start.png"/></div>
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
    gotoGuideView () {
      router.push({ name: 'guide', params: {} })
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
  padding-top: 15vw;
  width: 42vw;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.ma_subject{
  width: 66%;
  margin: 26vw auto 0 auto;
  img{
    width: 100%;
  }
}

.ma_slogan{
  width: 28%;
  margin: 33vh auto 0 auto;
  img{
    width: 100%;
  }
}

.ma_start{
  margin: 8vw auto;
  opacity: 0;
  width: 40%;
  opacity: 0;
  width: 40%;
  img{
    width: 100%;
  }
}

</style>
