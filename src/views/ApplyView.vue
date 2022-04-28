<template>
    <div style="height:100%;">
        <!-- 报名信息视图 -->
        <div class="apply_bg" v-if="step==0">
          <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
          <div class="ap_box">
            <ul>
              <li><input class="input_name magictime boingInUp" type="text" placeholder=" " v-model="formData.name" maxlength="20" /></li>
              <li><input class="input_mobile magictime boingInUp" type="tel" placeholder=" " v-model="formData.mobile"  maxlength="11" style="animation-delay: 0.05s;" /></li>
              <li><input class="input_number magictime boingInUp" type="text" placeholder=" " v-model="formData.number" maxlength="9" style="animation-delay: 0.1s;" /></li>
              <li><input class="input_city magictime boingInUp" type="text" placeholder=" " v-model="formData.city" maxlength="4" style="animation-delay: 0.15s;" /></li>
              <li>
                <div class="btn_channel magictime boingInUp" style="animation-delay: 0.2s;" @click="selectChannel">
                  <img :src="channel_sel_img"/>
                </div>
              </li>
            </ul>
          </div>
          <div class="ap_next magictimeDelay tinDownIn" @click="showUploadPic"><img src="../assets/img/apply_next.png"/></div>
          <div class="channel_box magictimeFast spaceInUp" v-if="showChannel">
            <ul>
              <li :class="(channel == 1) ? 'channel_1_on' : 'channel_1'" @click="selChannel(1)"></li>
              <li :class="(channel == 2) ? 'channel_2_on' : 'channel_2'" @click="selChannel(2)"></li>
              <li :class="(channel == 3) ? 'channel_3_on' : 'channel_3'" @click="selChannel(3)"></li>
              <li :class="(channel == 4) ? 'channel_4_on' : 'channel_4'" @click="selChannel(4)"></li>
            </ul>
            <div class="btn_channel_confirm" style="animation-delay: 0.4s;" @click="confirmChannel"><img src="../assets/img/channel_confirm.png"/></div>
          </div>
        </div>

        <!-- 上传照片视图 -->
        <div class="apply_upload_bg" v-if="step==1" >
          <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
          <div class="upload_title"><img src="../assets/img/upload_title.png"/></div>
          <div class="preview_box" >
            <el-upload
              class="avatar-uploader"
              action="http://api.wuxuwei.vip/watsons/api/qiniu/image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers=headers
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.avatarUrl !== ''" :src="formData.avatarUrl" class="avatar">
              <div v-else class="avatar-uploader-icon"></div>
            </el-upload>

          </div>
          <div class="upload_tips"><img src="../assets/img/upload_tips.png"/></div>
          <div class="upload_create magictimeDelay tinDownIn" @click="complexImage"><img src="../assets/img/apply_upload_create.png"/></div>
        </div>

        <div class="apply_complex" v-if="step==2">
          <div ref="content" class="apply_complex_image" v-if="complex_done==false">
            <div class="complex_logo"><img src="../assets/img/cover_logo.png"/></div>
            <div class="image_box">
              <img :src="channel_box" />
            </div>
            <vue-qr
              :text="qrImgUrl"
              :size="68"
              :margin= 5
              :logoSrc="logo"
              :logoScale= 0.2
              :logoMargin = 2
              class="qr_img">
            </vue-qr>
            <span class="applyer">Wendy Yin</span>
          </div>

          <div class="complex_preview" v-if="complex_done">
            <img :src="complex_data" />
          </div>
          <div class="complex_action">
            <img class="btn_back" @click="goBack" src="../assets/img/complex_back.png"/>
            <img class="btn_share" @click="shareImg" src="../assets/img/apply_list_share.png"/>
          </div>
        </div>

        <div class="mask" v-if="showChannel"></div>
    </div>
</template>

<script>
import api from '@/api'
import html2canvas from 'html2canvas'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import logo from '@/assets/img/logo-mini.png'
import Box1 from '@/assets/img/channel_box_1.png'
import Box2 from '@/assets/img/channel_box_2.png'
import Box3 from '@/assets/img/channel_box_3.png'
import Box4 from '@/assets/img/channel_box_4.png'
import chBtn from '@/assets/img/apply_input_channel.png'
import chBtn1 from '@/assets/img/channel_btn_1.png'
import chBtn2 from '@/assets/img/channel_btn_2.png'
import chBtn3 from '@/assets/img/channel_btn_3.png'
import chBtn4 from '@/assets/img/channel_btn_4.png'
import { imgsPreloader } from '@/assets/js/imgPreloader'

// import wx from 'weixin-js-sdk'
// import router from '@/router'

export default {
  data () {
    return {
      step: 0,
      channel: 0,
      channel_sel_img: chBtn,
      showChannel: false,
      headers: { 'Content-Type': 'image/jpeg' },
      formData: {
        name: '',
        mobile: '',
        number: '',
        city: '',
        avatarUrl: '',
        complexImageUrl: ''
      },
      qrImgUrl: 'http://watsons.wuxuwei.vip/guide',
      logo: logo,
      complex_done: false,
      complex_data: null,
      appId: 'wx6b991773cd84806c',
      timestamp: '',
      noncstr: '',
      signatureInfo: ''
    }
  },
  computed: {
    channel_box: function () {
      if (this.channel === 1) {
        return Box1
      } else if (this.channel === 2) {
        return Box2
      } else if (this.channel === 3) {
        return Box3
      }
      return Box4
    }
  },
  components: {
    VueQr
  },
  beforeCreate () {
  },
  mounted () {
    const list = [
      require('@/assets/img/channel_box.png'),
      require('@/assets/img/channel_1_off.png'),
      require('@/assets/img/channel_1_on.png'),
      require('@/assets/img/channel_2_off.png'),
      require('@/assets/img/channel_2_on.png'),
      require('@/assets/img/channel_3_off.png'),
      require('@/assets/img/channel_3_on.png'),
      require('@/assets/img/channel_4_off.png'),
      require('@/assets/img/channel_4_on.png'),
      require('@/assets/img/channel_confirm.png')
    ]
    imgsPreloader(list)
  },
  methods: {
    postApply () {
      if (!this.formData.name) {
        this.$message.error('请填写姓名')
        return false
      }
      if (!this.formData.mobile) {
        this.$message.error('请填写手机号')
        return false
      }
      if (!this.formData.number) {
        this.$message.error('请填写工号')
        return false
      }
      // if (!this.formData.city) {
      //     this.$message.error('请选择赛道')
      //     return false
      // }
      const form = {
        userName: this.formData.name,
        userNumber: this.formData.number,
        userCity: '上海',
        userChanel: '1',
        userAvatar: this.formData.avatarUrl,
        userMobile: this.formData.mobile,
        complexImage: '合成海报url'
      }
      api.postApply(form).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '报名成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
        .catch((res) => {
          console.log(res)
        })
    },
    showUploadPic () {
      // this.postApply()
      this.step = 1
    },
    uploadImage () {
      this.$alert('上传过程中请勿刷新或离开页面', '提示', {
        confirmButtonText: '我知道了',
        callback: action => {
          this.formData.avatarUrl = 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
        }
      })
    },
    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.$message.success('上传成功')
        this.formData.avatarUrl = res.data
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 <= 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    complexImage () {
      this.$message.info('生成图片...')
      this.step = 2
      setTimeout(() => {
        this.saveImg()
      }, 1000)
    },
    createImg () {
      const content = this.$refs.content
      const scrollHeight = content.scrollHeight
      const scrollWidth = content.scrollWidth
      html2canvas(content, {
        scale: window.devicePixelRatio * 2,
        useCORS: true, // 开启跨域配置，但和allowTaint不能共存
        width: scrollWidth,
        height: scrollHeight,
        windowWidth: scrollWidth,
        windowHeight: scrollHeight,
        x: 0,
        y: window.pageYOffset
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/jpg')
        const link = document.createElement('a')
        link.href = dataURL
        const filename = `${new Date().getTime()}.jpg` // 文件名称
        link.setAttribute('download', filename)
        link.style.display = 'none' // a标签隐藏
        document.body.appendChild(link)
        link.click()
      })
    },
    saveImg () {
      const content = this.$refs.content
      html2canvas(this.$refs.content, {
        scale: window.devicePixelRatio * 2,
        useCORS: true, // 开启跨域配置，但和allowTaint不能共存
        width: content.scrollWidth,
        height: content.scrollHeight,
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight,
        x: 0,
        y: window.pageYOffset
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/jpeg', 0.6)
        this.complex_done = true
        this.complex_data = dataURL
        // 赋值显示到界面
        const filename = `${new Date().getTime()}.png`
        const fileUrl = this.dataURLtoFile(dataURL, filename, 'image/jpeg') // 将 文件转换成file的格式，就可以使用file_url传递给服务端了
        const formData = new FormData()
        formData.append('file', fileUrl)

        // uploadFile(formData).then(res => {

        // })
      })
    },
    dataURLtoFile (base64, filename, contentType) {
      const arr = base64.split(',') // 去掉base64格式图片的头部
      const bstr = atob(arr[1]) // atob()方法将数据解码
      let leng = bstr.length
      const u8arr = new Uint8Array(leng)
      while (leng--) {
        u8arr[leng] = bstr.charCodeAt(leng) // 返回指定位置的字符的 Unicode 编码
      }
      return new File([u8arr], filename, { type: contentType })
    },
    selChannel (c) {
      this.channel = c
      if (this.channel === 1) {
        this.channel_sel_img = chBtn1
      } else if (this.channel === 2) {
        this.channel_sel_img = chBtn2
      } else if (this.channel === 3) {
        this.channel_sel_img = chBtn3
      } else if (this.channel === 4) {
        this.channel_sel_img = chBtn4
      }
    },
    selectChannel () {
      this.showChannel = true
    },
    confirmChannel () {
      if (this.channel === 0) {
        this.$message.warning('请选择赛道')
      } else {
        this.showChannel = false
      }
    },
    goBack () {
      this.step = 1
      this.complex_done = false
      this.complex_data = null
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
      padding: 1.6vw 0;
    }
    input,button{
      width: 54vw;
      height: 12.5vw;
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
    img{
      width: 54vw;
      height: 12.5vw;
    }
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

.channel_box{
  z-index: 999;
  position: fixed;
  top: 32vw;
  left: 8vw;
  width: 84vw;
  height: 118vw;
  background-image: url('../assets/img/channel_box.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ul{
    width: 80%;
    padding-top: 25vw;
    margin: 0 auto;
    li{
      width: 100%;
      height: 11vw;
      margin-top: 5.5vw;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
    .channel_1{
      background-image: url('../assets/img/channel_1_off.png');
    }
    .channel_1_on{
      background-image: url('../assets/img/channel_1_on.png') !important;
    }
    .channel_2{
      background-image: url('../assets/img/channel_2_off.png');
    }
    .channel_2_on{
      background-image: url('../assets/img/channel_2_on.png') !important;
    }
    .channel_3{
      background-image: url('../assets/img/channel_3_off.png');
    }
    .channel_3_on{
      background-image: url('../assets/img/channel_3_on.png') !important;
    }
    .channel_4{
      background-image: url('../assets/img/channel_4_off.png');
    }
    .channel_4_on{
      background-image: url('../assets/img/channel_4_on.png') !important;
    }
  }

  .btn_channel_confirm{
    margin: 7vw auto 0 auto;
    width: 40%;
    img{
      width: 100%;
    }
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
    width: 56vw;
    height: 72vw;
    text-align: left;
    background-image: url('../assets/img/apply_upload_previe.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    margin: 2vw auto;
    .upload_image{
        width: 53.2vw;
        height: 69.1vw;
        overflow: hidden;
        padding: 3px;
        box-sizing: border-box;
        object-fit: cover;
    }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  width: 53vw;
  height: 68.5vw;
  text-align: left;
}
.avatar {
  width: 53vw;
  height: 68.5vw;
 }

 .apply_complex{
    width: 100%;
    height: 100%;

    .complex_action{
      position: fixed;
      bottom:11vw;
      width:100%;
      text-align: center;
      img{
        width: 22vw;
        margin: 0 6vw;
      }
    }
 }
 .complex_preview{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    img{
      width: 100%;
      -webkit-touch-callout: default;
    }
 }
 .apply_complex_image{
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/channel_bg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #6d6d6d;

    .complex_logo{
      padding-top: 7.5vw;
      width: 30vw;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
    .image_box{
      width: 77vw;
      height: 111.8vw;
      margin: 4vw auto 0 auto;
      background-image: url('https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg');
      background-position: 6.8vw 32vw;
      background-repeat: no-repeat;
      background-size: 59vw;
      img{
        width: 100%;
      }
    }
    .qr_img{
        width: 17.5vw;
        position: absolute;
        left: 13vw;
      }
    .applyer{
      display: block;
      width: 31vw;
      position: absolute;
      right: 23vw;
      color: #fff;
      font-size: 1.8em;
      margin-top: 4.3vw;
      font-weight: bold;
      text-shadow: 1.5px 1.5px 1px #575757;
    }
 }
</style>
