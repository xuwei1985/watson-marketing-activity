<template>
    <div class="guide_bg">
       <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
       <div class="ap_box">
        <ul>
          <li><button class="button_1 magictime boingInUp" @click="gotoApplyView" /></li>
          <li><button class="button_2 magictime boingInUp" style="animation-delay: 0.2s;" @click="gotoVoteView" /></li>
          <li><button class="button_3 magictime boingInUp" style="animation-delay: 0.4s;" @click="gotoUploadView" /></li>
        </ul>
       </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
  data () {
    return {
    }
  },
  methods: {
    gotoApplyView () {
      router.push({ name: 'apply', params: {} })
    },
    gotoVoteView () {
      this.$message.warning('投票尚未开放')
    },
    gotoUploadView () {
      this.$message.warning('上传资料尚未开放')
    }
  }
}
</script>

<style lang="scss" scoped>
.guide_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/guide_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}
.ap_logo{
  padding-top: 11vh;
  width: 42vw;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.ap_box{
  width: 88%;
  height: 68vh;
  background-image: url('../assets/img/guide_box.png');
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
    background-image: url('../assets/img/guide_sign.png');
  }
  .button_2{
    background-image: url('../assets/img/guide_vote.png');
  }
  .button_3{
    background-image: url('../assets/img/guide_upload.png');
  }
}

</style>
