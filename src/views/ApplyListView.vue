<template>
  <div style="height:100%;">
    <div class="apply_list_bg">
      <div class="input_search">
        <input type="text" maxlength="20" v-model="queryParmas.queryParmas" placeholder="" />
        <img src="@/assets/img/proof_placeholder.png"/>
      </div>

      <div id="apply_list_box">
        <div style="height:37vw;"></div>
        <ul id="apply_data_list">
          <li v-for="(ele,index) in applyList" v-bind:key='ele.id'>
            <span class="rank">{{(index+1) >= 10 ? (index+1) : '0'+(index+1)}}</span>
            <el-image class="avatar" :src="ele.userAvatar"/>
            <div class="info">
              <span>{{ele.name }}</span>
              <span>{{ele.userChanel == 1 ? '爱”玩“精致党' : '贴心焕“颜”团'}}</span>
            </div>
             <div class="action">
                <img v-if="ele.votes!=1" class="icon_vote" src="@/assets/img/rank_vote_zan_dis.png"/>
                <img v-if="ele.votes==1" class="icon_vote" src="@/assets/img/rank_vote_zan.png"/>
                <span @click="vote(ele.id)"> {{ele.votes || 89}}</span>
             </div>
          </li>
          <el-button v-if="this.isLoading" type="text" size="mini" loading>Loading</el-button>
        </ul>
        <div class="apply_list_down"><img src="@/assets/img/apply_list_down.png"/></div>
      </div>
      <div class="apply_list_bottom"><img src="@/assets/img/complex_back.png" @click="goBackToApply"/><img src="@/assets/img/apply_list_share.png"/></div>

    </div>
    </div>
</template>

<script>
import api from '@/api'
import router from '@/router'

export default {
  data () {
    return {
      time: null,
      voterId: 0,
      applyList: [],
      isLoading: false,
      queryParmas: {
        page_num: 1,
        page_size: 20,
        queryParmas: '',
        voterId: 0
      }
    }
  },
  created () {
    this.getApplyList()
  },
  mounted () {
    document.getElementById('apply_data_list').addEventListener('scroll', this.handleScroll, true)
  },
  unmounted () {
    document.getElementById('apply_data_list').removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getApplyList () {
      this.isLoading = true
      this.queryParmas.queryParmas = decodeURI(this.queryParmas.queryParmas)
      api.getApplyList(this.queryParmas).then((res) => {
        this.queryParmas.page_num++
        this.applyList = this.applyList.concat(res.data)
      })
        .catch((res) => {
          this.$message({
            message: '数据加载发生错误',
            type: 'error'
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    vote (applyerId) {
      api.vote({ voterId: this.voterId, applyerId: applyerId }).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '投票成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    goBackToApply () {
      router.back()
    },
    showUploadPic () {
      this.postApply()
    },
    handleScroll (e) {
      if (e.target.scrollTop + e.target.clientHeight + 30 >= e.target.scrollHeight) {
        if (!this.isLoading) {
          // 防抖语句
          if (this.time !== null) {
            clearTimeout(this.time)
            this.time = setTimeout(() => {
              console.log('load more')
              this.getApplyList()
            }, 800)
          } else {
            console.log('load more')
            this.getApplyList()
          }
        }
      } else {
        clearTimeout(this.time)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.apply_list_bg{
  width: 100%;
  height: 100%;
  padding-top: 10vw;
  background-image: url('@/assets/img/apply_upload_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
  background-position: center;
  .apply_list_bottom{
    position: fixed;
    width: 100%;
    bottom: 9vw;
    img{
      width: 20vw;
      margin:0 15vw 0 15vw;
     }
  }
  input{
    width: 60vw;
    height: 10vw;
    padding: 0 14vw 0 4vw;
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
}

.input_search{
  position: relative;
  width: 60%;
  margin: 0 auto;
  input{
    background-image: url('@/assets/img/apply_list_search.png');
    margin-bottom: 3.5vw;
  }
  img{
    width: 60%;
    position: absolute;
    top: 12%;
    left: 10%;
  }
}
.apply_list_down{
   img{
     width: 20vw;
     margin: 4vw auto;
  }
}

#apply_list_box{
  width: 93vw;
  height: 75.5vh;

  background-image: url('@/assets/img/apply_list_title.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  background-position-y: -3vw;
  margin: 0vw auto 0 8vw;

  ul{
    width: 100%;
    height: 51vh;
    overflow-y:scroll;
    scroll-behavior: smooth;
    li{
        height: 14.3vw;
        width: 79%;
        line-height: 14.3vw;
        padding: 0 2.8vw 0 1.2vw;
        margin: 0vw auto 4.5vw auto;
        margin-left: 5%;
        background-image: url(data:image/jpeg;base64,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UmVhZHlxyWU8AAADI2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTI2NjQ1NDFDNTdEMTFFQzhDNkFFMzZCQkEwRDc1OEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTI2NjQ1NDJDNTdEMTFFQzhDNkFFMzZCQkEwRDc1OEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMjY2NDUzRkM1N0QxMUVDOEM2QUUzNkJCQTBENzU4QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMjY2NDU0MEM1N0QxMUVDOEM2QUUzNkJCQTBENzU4QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsQtQwsAAAQxSURBVHja7NzPKkRhGMDhGanZsXEHpKzcCIpcABcgcQ3KUslaLkAUF2JjIrfAhrKYLMb7caZO8mfOzHzHyPPUuzBz5nPOZ6bxi6bZbrcbJTMxuzFLMfMxrfKd3W63MYh+H5d7/VE8Ptc5DrLusNfd7xpVv884XGuu43Oc+yjPdVzXyrknda1V1zkN87oedN1x/HnkPKe/9pyo63rqfu7mfE4O8zzL/Z73G+9ndbwP5biudEyudX/j96NR7F352H7XGuS19uH2TsxtzEXcfhjz0LtjsnTQWsxxzHQDAADg/Q8Li8Vsx2zGnKU7JooDVmNORQQAAPCFqaIZVnshkf6d6SSmaW8AAIBvNIt2mEkhsVXUBQAAwE9SO+ykkFixFwAAQAXLKSQW7AMAAFDBfAqJln0AAAAqaE3YAwAAoCohAQAACAkAAEBIAAAAQgIAABASAACAkAAAABASAACAkAAAAIQEAAAgJAAAACEBAAAgJAAAACEBAAAICQAAQEgAAABCAgAAQEgAAABCAgAAEBIAAICQAAAAhAQAACAkAAAAhAQAACAkAAAAIQEAAAgJAABASAAAAAgJAABASAAAAEICAAAQEgAAgJAAAAAQEgAAgJAAAACEBAAAICQAAAAhAQAAICQAAAAhAQAACAkAAEBIAAAAQgIAABASAAAAQgIAABASAACAkAAAAIQEAAAgJAAAAIQEAAAgJAAAACEBAAAICQAAQEgAAAAICQAAQEgAAABCAgAAEBIAAICQAAAAEBIAAICQAAAAhAQAACAkAAAAIQEAAAgJAAAAIQEAAAgJAABASAAAAEICAAAQEgAAAEICAAAQEgAAgJAAAACEBAAAICQAAACEBAAAICQAAAAhAQAACAkAAEBIAAAACAkAAEBIAAAAQgIAABASAACAkAAAAIQEAACAkAAAAIQEAAAgJAAAACEBAAAICQAAACEBAAAICQAAQEgAAABCAgAAEBIAAABCAgAAEBIAAICQAAAAhAQAACAkAAAAIQEAACAkAAAAIQEAAAgJAABASAAAAEICAABASAAAAEICAAAQEgAAgJAAAACEBAAAgJAAAACEBAAAICQAAAAhAQAACAkAAAAhAQAACAkAAEBIAAAAQgIAABASAACAkAAAABASAACAkAAAAIQEAAAgJAAAACEBAAAgJAAAACEBAAAICQAAQEgAAABCAgAAQEgAAABCAgAAEBIAAICQAAAAhAQAAICQAAAAhAQAACAkAAAAIQEAAAgJAABASAAAAAgJAABASAAAAGMWEh3bAAAAVNBJIXFjHwAAgAruUkhc2AcAAKCCyxQSRzFP9gIAAOhDaoeDFBL3MZsxXXsCAAB8IzXDRsxD71ObzmLWYx7tDQAA8ImnohnO0xflj39NMTEXsx9zHfNirwAA4F97jrmK2YuZLZrhzasAAwBXXiX2T9iowgAAAABJRU5ErkJggg==);
        background-size: cover;
        border-radius: 3px;
        box-sizing: border-box;
       .rank{
          float: left;
          font-size: 2.3em;
          color: #5e3dc3;
          font-family: "Arial, sans-serif" !important;
          font-weight: 300;
       }
       .avatar{
          float: left;
          width: 14vw;
          height: 14vw;
          object-fit: cover;
          border-radius: 7vw;
          margin-left: 1.8vw;
          object-fit: cover;
       }
       .info{
         float: left;
         width: 34.5vw;
         margin-left: 0.5vw;
         padding-top: 2.1vw;
         overflow: hidden;
         span{
           display: block;
           line-height: 5.4vw;
           color: #5e3dc3;
           font-size: 1.4em;
           font-weight: bold;
         }
       }
       .action{
         float: right;
         width: 6.8vw;
         line-height: 5.8vw;
         padding-top: 2.2vw;
         img{
           width: 86%;
           display: block;
           margin: 0 auto;
         }
         span{
           font-size: 1.4em;
           font-weight: bold;
           color: #494949;
         }
       }
    }
    li:after{content:'';display:block;}
    button{
      color: #5f3ba2;
      font-size: 12px;
      height: 18px;
      margin-bottom: 10px;
    }
  }
}

</style>
