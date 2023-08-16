<template>
  <view class="float_menu">
    <div @click="callClick">
      <view class="float_menu_bg">
        <image src="/static/img/left_gif_1.gif" class="icon" style="width: 3vw;" mode="widthFix"></image>
      </view>
      <view class="title" style="margin-bottom: 1vw;">
        呼叫<br>
        大堂经理
      </view>
    </div>
    <div v-if="level != 1">
      <view class="float_menu_bg" @click="goHome">
        <image src="/static/img/home.png" class="icon" mode="widthFix"></image>
      </view>
      <view class="title" style="margin-bottom: 1vw;" @click="goHome">
        返回首页
      </view>
    </div>
    <div v-if="level === 3">
      <view class="float_menu_bg" @click="goReturn">
        <image src="/static/img/fh.png" class="icon" mode="widthFix"></image>
      </view>
      <view class="title" @click="goReturn">
        返回
      </view>
    </div>
    
  </view>
</template>

<script>
export default {
  props: {
    level: {
      type: Number
    }
  },
  name: 'float_menu',
  data () {
    return {
      levelType: null
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
    },
    callClick(){
      this.$emit("callBox")
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
