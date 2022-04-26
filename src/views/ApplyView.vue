<template>
    <div class="apply_bg">
       <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
       <div class="ap_box">
        <ul>
          <li><input class="input_name magictime boingInUp" maxlength="20" @focus="changeBg" /></li>
          <li><input class="input_mobile magictime boingInUp" maxlength="11" style="animation-delay: 0.1s;" @focus="changeBg" /></li>
          <li><input class="input_number magictime boingInUp" maxlength="9" style="animation-delay: 0.2s;" @focus="changeBg" /></li>
          <li><input class="input_city magictime boingInUp" maxlength="4" style="animation-delay: 0.3s;" @focus="changeBg" /></li>
          <li><button class="btn_channel magictime boingInUp" style="animation-delay: 0.4s;" @click="selectChannel" /></li>
        </ul>
       </div>
      <div class="ap_next magictimeDelay tinDownIn" @click="showUploadPic"><img src="../assets/img/apply_next.png"/></div>
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
  background-image: url('../assets/img/guid_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}
.ap_logo{
  padding-top: 15vw;
  width: 42vw;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.ap_box{
  width: 100vw;
  height: 126.5vw;
  background-image: url('../assets/img/apply_box.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  margin: 2vw auto;

  ul{
    padding-top: 36vw;
    li{
      padding: 1.5vw 0;
    }
    input,button{
      width: 48vw;
      height: 13.8vw;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      background-color: transparent;
      border: 1px solid #cfcfcf;
      border-radius: 1.8vw;
      text-align: center;
      font-size: 2.4em;
      padding: 0.2vw 4vw 0.5vw 3.7vw;
      box-sizing: border-box;
      color:#5f3ba2;
    }
  }

  .input_name{
    background-image: url('../assets/img/apply_input_name.png');
  }
  .input_mobile{
    background-image: url('../assets/img/apply_input_mobile.png');
  }
  .input_number{
    background-image: url('../assets/img/apply_input_number.png');
  }
  .input_city{
    background-image: url('../assets/img/apply_input_city.png');
  }
  .btn_channel{
    background-image: url('../assets/img/apply_input_channel.png');
  }
}

.ap_next{
  margin: 7vw auto 0 auto;
  opacity: 0;
  width: 38%;
  opacity: 0;
  img{
    width: 100%;
  }
}

</style>
