<template>
    <div class="apply_bg">
       <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
       <div class="ap_box">
        <ul>
          <li><button class="button_1 magictime boingInUp" @click="postApply" /></li>
          <li><button class="button_2 magictime boingInUp" style="animation-delay: 0.2s;" @click="postApply" /></li>
          <li><button class="button_3 magictime boingInUp" style="animation-delay: 0.4s;" @click="postApply" /></li>
        </ul>
       </div>
    </div>
</template>

<script>
import api from '@/api'

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
      api.postApply({ page_num: 1, page_size: 10 }).then((res) => {
      // 请求成功
        this.rightsList = res.data
        console.log(res)
      })
        .catch((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/apply_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}
.ap_logo{
  padding-top: 11.5vh;
  width: 45%;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.ap_box{
  width: 88%;
  height: 70vh;
  background-image: url('../assets/img/apply_box.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  margin: 0vh auto;

  ul{
    padding-top: 23vh;
    li{
      padding: 1.2vh 0;
    }
  }

  .button_1,.button_2,.button_3{
    width: 62%;
    height: 7.3vh;
    border: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-color: transparent;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
    border-radius: 1.8vw;
  }

  .button_1{
    background-image: url('../assets/img/apply_sign.png');
  }
  .button_2{
    background-image: url('../assets/img/apply_vote.png');
  }
  .button_3{
    background-image: url('../assets/img/apply_upload.png');
  }
}

</style>
