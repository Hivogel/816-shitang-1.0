<template>
  <view class="float_call">
    <view class="float_menu_bg">
      <image src="/static/img/left_gif_1.gif" class="icon" mode="widthFix"></image>
    </view>
    <view class="title">
      呼叫<br>
      大堂经理
    </view>
  </view>
</template>

<script>
export default {
  name: 'float_call',
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

<style scoped lang="scss">
.float_call {
  color: #fff;
  width: 4vw;
  position: fixed;
  bottom: 13.75vw;
  left: 1vw;
  z-index: 20;
  .float_menu_bg {
    width: 3vw;
    height: 3vw;
    border-radius: 50%;
    background: #016bed52;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    cursor: pointer;
    .icon {
      width: 100%;
    }
  }
  .title {
    font-size: 0.83vw;
    text-align: center;
    margin-top: 0.5vw;
  }
}
</style>
