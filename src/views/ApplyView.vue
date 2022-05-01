<template>
    <div style="height:100%;">
        <!-- 报名信息视图 -->
        <div class="apply_bg" v-if="step==0">
          <div class="ap_logo"><img src="../assets/img/cover_logo.png"/></div>
          <div class="ap_box">
            <ul>
              <li><input class="input_name magictime boingInUp" type="text" placeholder=" " v-model.trim="formData.name" maxlength="15" /></li>
              <!-- <li><input class="input_mobile magictime boingInUp" type="tel" placeholder=" " v-model.trim="formData.mobile"  maxlength="11" style="animation-delay: 0.05s;" /></li> -->
              <li><input class="input_number magictime boingInUp" type="text" placeholder=" " v-model.trim="formData.number" maxlength="8" style="animation-delay: 0.1s;" /></li>
              <!-- <li><input class="input_city magictime boingInUp" type="text" placeholder=" " v-model.trim="formData.city" maxlength="4" style="animation-delay: 0.14s;" /></li> -->
              <li>
                <div class="btn_channel magictime boingInUp" style="animation-delay: 0.15s;" @click="selectChannel">
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
            :data="dataObj"
            class="avatar-uploader"
            accept="image/png,image/jpg,image/jpeg"
            action="http://up-na0.qiniup.com"
            :show-file-list="false"
            name="file"
            :on-error="handleUploadError"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="avatarFileUrl !== null" :src="avatarFileUrl" class="avatar">
            <div v-else class="avatar-uploader-icon"></div>
          </el-upload>

          </div>
          <div class="upload_tips"><img src="../assets/img/upload_tips.png"/></div>
          <div class="upload_create magictimeDelay vanishIn">
            <img class="btn_back" @click="goBackToApply" src="../assets/img/upload_back.png"/>
            <img src="../assets/img/apply_upload_create.png" @click="postApply" />
          </div>
        </div>

        <div class="apply_complex" v-if="step==2">
          <div ref="content" class="apply_complex_image" v-if="!complex_done">
            <div class="complex_logo"><img src="../assets/img/cover_logo.png"/></div>
            <div class="image_box">
              <img :src="avatarFileUrl" class="box_avatar" />
              <img :src="channel_box" class="box_cover" @load="resourceLoaded" />
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
            <span class="applyer">{{formData.name}}</span>
          </div>

          <div class="complex_preview" v-if="complex_done">
            <img :src="complex_data" />
          </div>
          <div class="complex_action magictimeFast vanishIn" v-if="complex_done">
            <img class="btn_back" @click="goBackToUpload" src="../assets/img/complex_back.png"/>
            <img class="btn_share" @click="shareImg" src="../assets/img/apply_list_share.png"/>
          </div>
        </div>

        <div class="mask magictimeFast puffIn" v-if="showMask"></div>
        <div class="share_tips magictimeFast puffIn" v-if="showShareTips">
          <img class="tips_img" src="../assets/img/complex_share_tip.png"/>
          <div @click="hideShare"><img class="tips_btn" src="../assets/img/complex_back.png"/></div>
        </div>
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
      showMask: false,
      showShareTips: false,
      headers: { 'Content-Type': 'image/jpeg' },
      formData: {
        id: null,
        name: '',
        number: '',
        channel: 0,
        avatarUrl: ''
      },
      avatarFileUrl: null,
      qrImgUrl: 'http://watsons.wuxuwei.vip/guide',
      logo: logo,
      complex_done: false,
      complex_data: null,
      complexResourceLoadNum: 0,
      dataObj: { token: '', key: '' }
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
    },
    avatarBackgroundImage: function () {
      return 'url(' + this.avatarFileUrl + ')'
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
      const form = {
        id: this.formData.id,
        userName: this.formData.name,
        userNumber: this.formData.number,
        userChanel: this.channel,
        userAvatar: this.formData.avatarUrl
      }
      api.postApply(form).then((res) => {
        if (res.code === 200) {
          this.formData.id = res.data
            if (this.avatarFileUrl !== null) {
            this.loading = this.$loading({
              lock: true,
              text: res.msg+',正在生成海报...',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            this.step = 2
          } else {
            this.$message.warning('请先上传照片')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
        .catch((res) => {
          this.$message.error(res)
        })
    },
    showUploadPic () {
      if (!this.formData.name) {
        this.$message.error('请填写选手昵称')
        return false
      }
      if (!this.formData.number) {
        this.$message.error('请填写员工工号')
        return false
      } else if (this.formData.number.length !== 8 && !(this.formData.number.substr(0, 1) === 4 || this.formData.number.substr(0, 1) === 5)) {
        this.$message.error('请填写正确的员工工号')
        return false
      }
      // if (!this.formData.city) {
      //   this.$message.error('请填写店铺号')
      //   return false
      // } else if ((this.formData.city <= 101 && parseInt(this.formData.city) !== 0) || this.formData.city >= 9900 || (parseInt(this.formData.city) === 0 && this.formData.city.length === 4)) {
      //   this.$message.error('请填写正确的店铺号')
      //   return false
      // }

      if (this.channel === 0) {
        this.$message.error('请选择赛道')
        return false
      }

      this.step = 1
    },
    handleAvatarSuccess (res, file) {
      this.$message.success('上传成功，点击“一键生成”即可完成报名')
      this.formData.avatarUrl = 'http://static.wuxuwei.vip/' + res.key
      this.avatarFileUrl = URL.createObjectURL(file.raw)
      this.loading.close()
    },
    handleUploadError () {
      this.$message({
        type: 'error',
        message: '上传失败，请稍后重试'
      })
      this.loading.close()
    },
    beforeAvatarUpload (file) {
      const types = ['image/jpg', 'image/png', 'image/jpeg']
      const isJPG = types.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 <= 3.1

      if (!isJPG) {
        this.$message.error('上传图片只支持jpg/png格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        return false
      }

      return this.asyncImgChecked(file).then(data => {
        if (!data) {
          return false
        } else {
          return new Promise((resolve, reject) => {
            api.getToken()
              .then(response => {
                this.loading = this.$loading({
                  lock: true,
                  text: '图片上传中',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                this.dataObj.key = `upload_pic_${new Date().getTime()}`
                this.dataObj.name = file.name
                this.dataObj.token = response.data
                resolve(true)
              })
              .catch(err => {
                console.log(err)
                reject(err)
              })
          })
        }
      })
    },
    asyncImgChecked (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file) // 必须用file.raw
        reader.onload = () => { // 让页面中的img标签的src指向读取的路径
          const img = new Image()
          img.src = reader.result
          if (img.complete) { // 如果存在浏览器缓存中
            if (img.height / img.width < 1.2 || img.height / img.width > 1.8) {
              this.$message.warning('上传的图片尺寸比例不合适，推荐比例4:3')
              resolve(false)
            } else {
              resolve(true)
            }
          } else {
            img.onload = () => {
              if (img.height / img.width < 1.2 || img.height / img.width > 1.8) {
                this.$message.warning('上传的图片尺寸比例不合适，推荐比例4:3')
                resolve(false)
              } else {
                resolve(true)
              }
            }
          }
        }
      })
    },
    resourceLoaded () {
      setTimeout(() => {
        this.saveImg()
        this.loading.close()
      }, 1300)
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
        const dataURL = canvas.toDataURL('image/jpeg', 0.8)
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
      this.showMask = true
    },
    confirmChannel () {
      if (this.channel === 0) {
        this.$message.warning('请选择赛道')
      } else {
        this.showChannel = false
        this.showMask = false
      }
    },
    goBackToUpload () {
      this.step = 1
      this.complex_done = false
      this.complex_data = null
    },
    goBackToApply () {
      this.step = 0
      this.complex_done = false
      this.complex_data = null
    },
    shareImg () {
      this.showMask = true
      this.showShareTips = true
    },
    hideShare () {
      this.showMask = false
      this.showShareTips = false
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
  height: 118vw;
  background-image: url('../assets/img/guide_box.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  margin: 10vw auto 2vw auto;

  ul{
    padding-top: 30vw;
    li{
      padding: 4vw 0;
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
    width: 58vw;
    height: 74vw;
    text-align: left;
    background-image: url('../assets/img/apply_upload_previe.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    margin: 6vw auto;
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
  padding-top: 11vw;
  width: 56vw;
  margin: 0 auto;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.upload_tips{
  padding-top: 4vw;
  width: 30vw;
  margin: 0 auto;
  margin: 0 auto;
  img{
    width: 100%;
  }
}

.upload_create{
  margin: 8vw auto 0 auto;
  opacity: 0;
  width: 100%;
  opacity: 0;
  img{
    display: inline-block;
    width: 35%;
    margin: 0 5vw;
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
  width: 54vw;
  height: 70.5vw;
  text-align: left;
}
.avatar {
    width: 53.6vw;
    height: 70vw;
    margin-left: 0.7vw;
    margin-top: 0.5vw;
    object-fit: cover;
 }

 .apply_complex{
    width: 100%;
    height: 100%;

    .complex_action{
      position: fixed;
      bottom:9.5vw;
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
    background-image: url('../assets/img/apply_upload_bg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    .complex_logo{
      padding-top: 7.5vw;
      width: 30vw;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
    .image_box{
      position: relative;
      width: 77vw;
      height: 108.8vw;
      margin: 4vw auto 0 auto;
      .box_cover{
        position: absolute;
        z-index: 200;
        width: 76vw;
        left: 2vw;
        top: 0vw;
      }
      .box_avatar{
        position: absolute;
        z-index: 199;
        width: 58.5vw;
        left: 9vw;
        height: 78vw;
        top: 31vw;
        object-fit: cover;
      }
      // background-position: 6.8vw 32vw;
      // background-repeat: no-repeat;
      // background-size: 59vw;
      // img{
      //   width: 100%;
      // }
    }
    .qr_img{
        width: 17.5vw;
        position: absolute;
        left: 14.5vw;
        z-index: 201;
        margin-top: 1.5vw;
        margin-left: 0.5vw;
      }
    .applyer{
      display: block;
      position: absolute;
      z-index: 203;
      margin-top: 6vw;
      width: 31vw;
      position: absolute;
      right: 21vw;
      color: #fff;
      font-size: 1.9em;
      font-weight: bold;
      text-shadow: 1.5px 1.5px 1px #575757;
    }
 }

.share_tips{
    position: fixed;
    z-index: 210;
    left: 14vw;
    width: 72vw;
    height: 93vw;
    top: 35vw;
    background-image: url('../assets/img/msg_box.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .tips_img{
      width: 85%;
      margin: 20vw auto;
    }

    .tips_btn{
      width: 35%;
      margin: 4vw auto;
    }
  }
</style>
