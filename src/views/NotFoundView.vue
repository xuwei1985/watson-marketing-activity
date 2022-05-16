<template>
  <div>
    <div class="bg" :style="bg"></div>
    <div class="text">真抱歉，您访问的页面走丢了</div>
  </div>
</template>
<style scoped>
body{
  font-size: 10px;
}
.bg{
  height: 20rem;
  background: no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  padding-top: 40vw;
  width: 85%;
}
.text{
  color: #666465;
  font-size: 2em;
  text-align: center;
}
</style>

<script>

export default {
  data () {
    return {
      bg: {
        backgroundImage: 'url(' + require('@/assets/img/404.png') + ')'
      }
    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {},

  watch: {}

}

</script>
