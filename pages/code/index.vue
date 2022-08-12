<template>
	<view class="code">
    <view class="container">
      <view class="title">{{appName}}</view>
      <input
        @input="getInput"
        class="input_box"
        placeholder="请在此处输入邀请码"
      />
      <view class="info">
        <view>
          <text>MAC地址：</text>
          <text>{{ mac }}</text>
        </view>
      </view>
      <view class="bottom_button" @click="login">确认</view>
    </view>
    
    
    <indexAlert></indexAlert>
	</view>
</template>

<script>
  import indexAlert from '@/pages/components/indexAlert.vue'

  // import g1 from '@/static/img/g1.jpg'
  // import g2 from '@/static/img/g2.jpg'
  // import g3 from '@/static/img/g3.jpg'
	export default {
    components: {
      indexAlert
    },
		data() {
			return {
        mac: '',
        text: '',
        appName: '',
        isLogin: false
			}
		},
		onLoad() {
      
		},
    onShow(){
      this.mac = getApp().globalData.mac
      this.appName = getApp().globalData.appName
    },
		methods: {
      getInput(value){
        this.text = value.target.value
      },
      login(){
        if(this.isLogin) return
        this.isLogin = true
        let data = {
          activationCode: this.text,
          terminalMacs: this.mac,
          appId: getApp().globalData.appID,
        };
        uni.request({
          url: getApp().globalData.apiUrl + "/app/getActivationCode", //仅为示例，并非真实接口地址。
          data: data,
          method: 'POST',
          success: (res) => {
            if(res.data.code != 200){
              uni.showToast({
              	title: res.data.msg,
                icon: 'error',
              	duration: 2000
              });
            }
            if(res.data.code == 200){
              uni.setStorageSync('key', this.text)
              uni.redirectTo({
                url: "/pages/index/index"
              })
            }
            this.isLogin = false
          }
        });
      }
    },
	}
</script>

<style scoped>
.code {
  width: 100vw;
  height: 100vh;
  background-image: url(/static/img/login_bg.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 41.6vw;
  height: 33vw;
  background: #fff;
  border-radius: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title {
  font-size: 3.33vw;
  color: #5e5e5e;
  font-weight: bold;
}
.input_box {
  margin-top: 3vw;
  width: 33.6vw;
  height: 4.17vw;
  background: #f3f3f3;
  border-radius: 10vw;
  border: none;
  outline: none;
  font-size: 1.25vw;
  line-height: 4.17vw;
  text-indent: 1.5vw;
}
.info {
  margin-top: 3vw;
  width: 33.6vw;
  font-size: 1.25vw;
}
.bottom_button {
  margin-top: 3vw;
  width: 26vw;
  height: 4.17vw;
  line-height: 4.17vw;
  text-align: center;
  background: #0482ff;
  color: #fff;
  border-radius: 5vw;
  font-size: 1.67vw;
}
</style>
