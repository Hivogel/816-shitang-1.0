<script>
  import w_md5 from "./js_sdk/zww-md5/w_md5.js"
	export default {
    globalData: {
      mac: null,
      ws: undefined,
      apiUrl: 'http://192.168.1.20:7500',
      // apiUrl: 'https://www.bjzytctech.com:7502',
      appID: '1676448167797740287',
      // appID: '1545253462774943746',
      appName: '邮储食堂-横版'
    },
		onLaunch: function() {
      var that = this 
			plus.screen.lockOrientation("landscape-primary");
			plus.navigator.setFullscreen(true);
      // 获取mac地址
      that.globalData.mac = w_md5.hex_md5_16Upper(plus.device.getDeviceId())
      // 验证激活码
      if(!uni.getStorageSync('key')){
        uni.redirectTo({
          url: "/pages/code/index"
        })
      }else{
        let data = {
          activationCode: uni.getStorageSync('key'),
          terminalMacs: this.globalData.mac,
          appId: this.globalData.appID,
        };
        uni.request({
          url: this.globalData.apiUrl + "/app/getActivationCode", //仅为示例，并非真实接口地址。
          data: data,
          method: 'POST',
          success: (res) => {
            if(res.data.code != 200){
              uni.showToast({
              	title: '激活码已失效',
                icon: 'error',
              	duration: 2000
              });
              uni.removeStorageSync('key');
              uni.redirectTo({
                url: "/pages/code/index"
              })
            }
          }
        });
      }
      
		},
		onShow: function() {
      // 链接webscoket
      this.globalData.ws = uni.connectSocket({
      	// url: 'wss://www.bjzytctech.com:7502/websocket',
        url: 'ws://192.168.1.20:7500/websocket',
      	complete: ()=> {}
      });
      var data = {
        mac: w_md5.hex_md5_16Upper(plus.device.getDeviceId()),
        type: '0', // 0 正常在线 1 申请下线
        ifOpen: '0' // 0 开机 1否
      }
      this.globalData.ws.onOpen((res)=>{
        console.log('已开启')
        this.globalData.ws.send({
          data: JSON.stringify(data)
        })
      })
      
      console.log('App Show')
		},
		onHide: function() {
      this.globalData.ws.close()
			console.log('App Hide')
		}
	}
</script>

<style>
@font-face {
  font-style: normal;
  font-family: YSBTH;
  src: url('/static/font/YSBTH.TTF') format('truetype');
}
@font-face {
  font-style: normal;
  font-family: YSBTH;
  src: url('/static/font/YSBTH.TTF') format('truetype');
}
/* FZZYJW */
</style>
