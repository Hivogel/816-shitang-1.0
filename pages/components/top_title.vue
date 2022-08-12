<template>
  <div class="public_title">
    <span class="title_text" data-before=''>周边优惠</span>
  </div>
</template>

<script>
export default {
  name: 'public_title',
  data () {
    return {
      
    }
  },
  mounted(){

  },
  methods: {
		
  }
}
</script>

<script module="text" lang="renderjs">
  export default {
    mounted(){
      const title_text = document.querySelector(".title_text");
      title_text.setAttribute("data-before",title_text.innerHTML)
      
    }
  }
</script>

<style scoped lang="scss">
.public_title {
  width: 100%;
  height: 4vw;
  background-image: url(/static/img/title_bg.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .title_text {
    position: relative;
    font-size: 3vw;
    font-family: YSBTH;
    position: relative;
    background: linear-gradient(0deg, #BDCDFF 0.146484375%, #EAFEFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 100;
    &::before {
      content: attr(data-before);
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(0deg, #BDCDFF 0.146484375%, #EAFEFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      z-index: 101;
    }
    &::after {
      content: attr(data-before);
      position: absolute;
      top: 0;
      left: 0;
      text-shadow: 0 0 1vw #6f92f7;
      z-index: 99;
    }
  }
}
</style>