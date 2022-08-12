<template>
  <view class="float_menu">
    <view class="float_menu_bg" @click="goHome">
      <image src="/static/img/home.png" class="icon" mode="widthFix"></image>
    </view>
    <view class="title" style="margin-bottom: 1vw;" @click="goHome">
      返回首页
    </view>
    <view class="float_menu_bg" @click="goReturn">
      <image src="/static/img/fh.png" class="icon" mode="widthFix"></image>
    </view>
    <view class="title" @click="goReturn">
      返回
    </view>
  </view>
</template>

<script>
export default {
  name: 'float_menu',
  data () {
    return {
      
    }
  },
  mounted(){
    
  },
  methods: {
		goHome(){
      uni.redirectTo({
        url: "/pages/index/index"
      })
    },
    goReturn(){
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.float_menu {
  color: #fff;
  width: 4vw;
  position: fixed;
  bottom: 2.5vw;
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
      width: 70%;
    }
  }
  .title {
    font-size: 0.83vw;
    text-align: center;
    margin-top: 0.5vw;
  }
}
</style>
