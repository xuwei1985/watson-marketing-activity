<template>
    <div style="height:100%;">
        <!-- 凭证信息提交视图 -->
        <div class="apply_bg" v-if="step==0">
          <div class="ap_logo"><img src="@/assets/img/cover_logo.png"/></div>
          <div class="ap_box">
            <ul>
              <li><input class="input_name magictime boingInUp" type="text" placeholder=" " v-model.trim="formData.name" maxlength="15" /></li>
              <li><input class="input_number magictime boingInUp" type="text" placeholder=" " v-model.trim="formData.number" maxlength="8" style="animation-delay: 0.1s;" /></li>
              <li><input class="input_zan magictime boingInUp" type="text" placeholder=" " v-model.trim="formData.number" maxlength="7" style="animation-delay: 0.15s;" /></li>
              <li class="btn_upload">
                <div class="btn_proof_pic magictime boingInUp"  style="animation-delay: 0.2s;">
                  <img src="@/assets/img/proof_pic.png" />
                </div>
                <div class="btn_proof_video magictime boingInUp"  style="animation-delay: 0.2s;">
                  <img src="@/assets/img/proof_video.png" />
                </div>
              </li>
            </ul>
          </div>
          <div class="ap_next magictimeDelay tinDownIn" @click="postProof"><img src="@/assets/img/proof_post.png"/></div>
        </div>
    </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      showMask: false,
      headers: { 'Content-Type': 'image/jpeg' },
      formData: {
        name: '',
        number: '',
        voteNum: 0,
        veidoUrl: '',
        mediaProof: ''
      },
      avatarFileUrl: null,
      dataObj: { token: '', key: '' }
    }
  },
  computed: {

  },
  components: {

  },
  beforeCreate () {
  },
  mounted () {
  },
  methods: {
    postProof () {
      this.checkForm()
      const form = {
        userName: this.formData.name,
        userNumber: this.formData.number,
        mediaProof: this.formData.mediaProof,
        veidoUrl: this.formData.veidoUrl
      }
      api.postProof(form).then((res) => {
        if (res.code === 200) {

        } else {
          this.$message.error(res.msg)
        }
      })
        .catch((res) => {
          this.$message.error(res)
        })
    },
    checkForm () {
      if (!this.formData.name) {
        this.$message.error('请填写姓名')
        return false
      }
      if (!this.formData.number) {
        this.$message.error('请填写工号')
        return false
      } else if (this.formData.number.length !== 8 && !(this.formData.number.substr(0, 1) === 4 || this.formData.number.substr(0, 1) === 5)) {
        this.$message.error('请填写正确的工号')
        return false
      } else if (!this.formData.zan) {
        this.$message.error('请填写点赞数')
        return false
      } else if (this.formData.mediaProof.length === 0) {
        this.$message.error('请上传数据截图')
        return false
      }

      return true
    },
    handleAvatarSuccess (res, file) {
      this.$message.success('上传成功，点击“一键生成”即可完成报名')
      this.formData.avatarUrl = 'http://assets.wuxuwei.vip/' + res.key
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
                this.dataObj.key = `applyer/upload_pic_${new Date().getTime()}`
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
    }
  }
}
</script>

<style lang="scss" scoped>
.apply_bg{
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/guide_bg.jpg');
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
  height: 116vw;
  background-image: url('@/assets/img/proof_box.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  margin: 8vw auto 2vw auto;

  ul{
    padding-top: 15vw;
    li{
      padding: 2.2vw 0;
    }
    input,button{
      width: 55vw;
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
    .input_name,.input_mobile,.input_number,.input_zan {
      background-image: url('@/assets/img/apply_input_bg.png');
    }
  }

  .input_name:placeholder-shown {
    background-image: url('@/assets/img/proof_name.png');
  }
  .input_zan:placeholder-shown{
    background-image: url('@/assets/img/proof_zan.png');
  }
  .input_number:placeholder-shown{
    background-image: url('@/assets/img/proof_number.png');
  }

  .btn_upload{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 22vw;
    margin-top: 2vw;
    .btn_proof_pic{
      img{
        width: 25vw;
      }
    }
    .btn_proof_video{
      img{
        width: 25vw;
      }
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

.apply_upload_bg{
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/apply_upload_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
}

.preview_box{
    width: 58vw;
    height: 74vw;
    text-align: left;
    background-image: url('@/assets/img/apply_upload_previe.png');
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
    background-image: url('@/assets/img/apply_upload_bg.jpg');
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
    background-image: url('@/assets/img/msg_box.png');
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
