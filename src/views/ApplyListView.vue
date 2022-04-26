<template>
  <div class="apply_list_bg">

  </div>
</template>

<style lang="scss" scoped>
.apply_list_bg{
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

</style>
