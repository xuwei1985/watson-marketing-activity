<template>
    <div class="apply_bg" v-if="step==0">
       <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
       <div class="ap_box">
        <ul>
          <li><input class="input_name magictime boingInUp" type="text" placeholder=" " v-model="formData.name" maxlength="20" /></li>
          <li><input class="input_mobile magictime boingInUp" type="tel" placeholder=" " v-model="formData.mobile"  maxlength="11" style="animation-delay: 0.1s;" /></li>
          <li><input class="input_number magictime boingInUp" type="text" placeholder=" " v-model="formData.number" maxlength="9" style="animation-delay: 0.2s;" /></li>
          <li><input class="input_city magictime boingInUp" type="text" placeholder=" " v-model="formData.city" maxlength="4" style="animation-delay: 0.3s;" /></li>
          <li><button class="btn_channel magictime boingInUp" style="animation-delay: 0.4s;" @click="selectChannel" /></li>
        </ul>
       </div>
      <div class="ap_next magictimeDelay tinDownIn" @click="showUploadPic"><img src="../assets/img/apply_next.png"/></div>
    </div>
    <div class="apply_upload_bg" v-if="step==1">
      <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
      <div class="upload_title"><img src="../assets/img/upload_title.png"/></div>
      <div class="preview_box"></div>
      <div class="upload_tips"><img src="../assets/img/upload_tips.png"/></div>
      <div class="upload_create magictimeDelay tinDownIn" @click="complexImage"><img src="../assets/img/apply_upload_create.png"/></div>
    </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      step: 0,
      formData: {
        name: '',
        mobile: '',
        number: '',
        city: '',
        avatarUrl: '',
        complexImageUrl: ''
      }
    }
  },
  methods: {
    postApply () {
      api.postApply(this.data.formData).then((res) => {
        console.log(res)
      })
        .catch((res) => {
          console.log(res)
        })
    },
    showUploadPic () {
      this.step = 1
    },
    complexImage () {
      console.log('生成图片')
    }
  }
}
</script>

<style lang="scss" scoped>
.apply_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/guide_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}

.ap_logo{
  padding-top: 12vw;
  width: 40vw;
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
      font-size: 2.2em;
      padding: 0.2vw 4vw 0.5vw 3.7vw;
      box-sizing: border-box;
      color:#5f3ba2;
      outline:none;
    }
    input:focus{
      outline: none;
    }
    .input_name,.input_mobile,.input_number,.input_city{
      background-image: url('../assets/img/apply_input_bg.png');
    }
  }

  .input_name:placeholder-shown {
    background-image: url('../assets/img/apply_input_name.png');
  }
  .input_mobile:placeholder-shown{
    background-image: url('../assets/img/apply_input_mobile.png');
  }
  .input_number:placeholder-shown{
    background-image: url('../assets/img/apply_input_number.png');
  }
  .input_city:placeholder-shown{
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

.apply_upload_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/apply_upload_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}

.preview_box{
    height: 72vw;
    background-image: url('../assets/img/apply_upload_previe.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    margin: 2vw auto;
}

.upload_title{
  padding-top: 3vw;
  width: 52vw;
  margin: 0 auto;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.upload_tips{
  padding-top: 4vw;
  width: 28vw;
  margin: 0 auto;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.upload_create{
  margin: 6vw auto 0 auto;
  opacity: 0;
  width: 38%;
  opacity: 0;
  img{
    width: 100%;
  }
}

</style>
