<template>
  <view class="call_box" @click="clearAutoJump">
    <view class="container_box">
      <view class="yuan">
        <image v-if="currentType=='loading'" src="/static/img/hujiao/loading.png" class="call_icon" mode=""></image>
        <image v-if="currentType=='success'" src="/static/img/hujiao/success.png" class="call_icon" mode=""></image>
        <image v-if="currentType=='error'" src="/static/img/hujiao/error.png" class="call_icon" mode=""></image>
      </view>
      <view class="title">{{hujiaoText}}</view>
    </view>
    <image src="/static/img/close_icon.png" class="close_icon" mode="" @click="closeBox"></image>
  </view>
</template>

<script>
export default {
  name: 'call_box',
  data () {
    return {
      currentType: 'loading',
      hujiaoText: '已呼叫大堂经理，请稍等...'
    }
  },
  mounted(){
    var that = this
    this.currentType = "loading";
    this.hujiaoText = "已呼叫大堂经理，请稍等...";
    this.$nextTick(function(){
      var ws = getApp().globalData.ws
      var data = {
        mac: getApp().globalData.mac,
        type: 5,
      };
      ws.send({
        data: JSON.stringify(data)
      })
      ws.onMessage((res)=>{
        const resData = JSON.parse(res.data)
        if (resData.type == "6") {
          // this.$store.commit('changeCallType',resData.result)
          if (resData.result == "确定") {
            that.currentType = "success";
            that.hujiaoText = "大堂经理已经收到呼叫，正在赶来，请稍后"
            
          }
          if (resData.result == "取消") {
            that.currentType = "error";
            that.hujiaoText = "大堂经理正忙，请稍后再试"
          }
          setTimeout(() => {
            this.$emit('isCloseCallBox',true)
          }, 3000);
        }
      });
    })
  },
  onShow(){
    this.$store.commit('clearTimer')
    this.$store.commit('playTimer')
  },
  methods: {
    clearAutoJump(){
      this.$store.commit('clearTimer')
      this.$store.commit('playTimer')
    },
		closeBox(){
      this.$emit('isCloseCallBox',true)
    }
  },
}
</script>

<style scoped lang="scss">
.call_box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .container_box {
    width: 51.2vw;
    height: 42.2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(/static/img/hujiao/hujiao_bg.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .yuan {
      width: 16vw;
      height: 16vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(/static/img/hujiao/icon_bg.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .call_icon {
        width: 6vw;
        height: 6.35vw;
      }
    }
    .title {
      font-size: 1.5625vw;
      color: #7CEEFF;
      text-align: center;
    }
  }
  .close_icon {
    width: 6.1vw;
    height: 6.1vw;
  }
}
</style>
