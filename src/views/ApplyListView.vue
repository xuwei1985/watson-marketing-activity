<template>
  <div style="height:100%;">
    <div class="apply_list_bg">
      <div class="apply_list_mkf"><img src="../assets/img/apply_list_mkf.png"/></div>
      <input class="input_search" type="text" maxlength="20" v-model="queryParmas.queryParmas" size="small" placeholder="">
      <div class="apply_list_box">
        <ul>
          <li v-for="(ele,index) in applyList" v-bind:key='ele.id'>
            <span class="rank">{{index+1}}</span>
            <img class="rank_avater" style="width: 5vw" :src="ele.userAvatar"/>
            <div>
              <p>{{ele.name }}</p>
              <p>{{ele.userChanel }}</p>
            </div>
             <div>
                <img class="icon_vote" style="width: 5vw" :src="ele.userAvatar"/>
                <span @click="vote(ele.id)"> {{ele.votes || 0}}</span>
             </div>
          </li>
        </ul>
        <div class="apply_list_down"><img src="../assets/img/apply_list_down.png"/></div>
      </div>
      <div class="apply_list_bottom"><img src="../assets/img/apply_list_vote.png"/><img src="../assets/img/apply_list_share.png"/></div>

    </div>
    </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      voterId: 1,
      applyList: [],
      queryParmas: {
        page_num: 1,
        page_size: 5,
        queryParmas: ''
      }
    }
  },
  created () {
    this.getApplyList()
  },
  methods: {
    getApplyList () {
      this.queryParmas.queryParmas = decodeURI(this.queryParmas.queryParmas)
      api.getApplyList(this.queryParmas).then((res) => {
        console.log(this.queryParmas)
        this.applyList = res.data
        console.log(this.applyList)
      })
        .catch((res) => {
          console.log(res)
        })
    },
    vote (applyerId) {
      api.vote({voterId: this.voterId, applyerId: applyerId}).then((res) => {
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
    showUploadPic () {
      this.postApply()
      // this.step = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.apply_list_bg{
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/apply_list_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6d6d6d;
  .apply_list_bottom{
      img{
      width: 20vw;
      margin:0 15vw 0 15vw;
     }
  }
  input,button{
    margin-top: 17.8vw;
    width: 61vw;
    height: 10.8vw;
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
  background-image: url('../assets/img/apply_list_search.png');
}
.apply_list_mkf{
   img{
     width: 17.8vw;
     position: absolute;
     top: 22%;
     left: 82%;
  }
}
.apply_list_down{
   img{
     width: 20vw;
     margin: 4vw auto;
  }
}

.apply_list_box{
  width: 100vw;
  height: 147.5vw;
  background-image: url('../assets/img/apply_list_title.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  margin: 6vw auto 0 auto;

  ul{
    padding-top: 33.6vw;
     li{
       height: 14vw;
      width: 70%;
      margin: 5.4vw auto;
       background-image: url('../assets/img/apply_list_applyer.jpg');

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

</style>
