<script>
	export default {
    globalData: {
      mac: null,
      ws: undefined,
      apiUrl: 'https://www.bjzytctech.com:7502',
      appID: '1545253462774943746',
      appName: '邮储食堂-横版'
    },
		onLaunch: function() {
			plus.screen.lockOrientation("landscape-primary");
			plus.navigator.setFullscreen(true);
      // 获取mac地址
      function getMacAddress(){
        var net = plus.android.importClass("java.net.NetworkInterface")  
        var wl0 = net.getByName('wlan0')  
        var macByte = wl0.getHardwareAddress()  
        var str = ''  
        for (var i = 0; i < macByte.length; i++) {  
            var tmp = "";  
            var num = macByte[i];  
            if (num < 0) {        
              tmp =(255+num+1).toString(16);  
            } else {  
              tmp = num.toString(16);  
            }  
            if (tmp.length == 1) {  
              tmp = "0" + tmp;  
            }  
            if(i == macByte.length-1){
                str += tmp; 
            }else{
                str = str + tmp + ":"; 
            }
        }  
        return str.toUpperCase()
      }
      this.globalData.mac = getMacAddress()
      
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
            }else{
              clearTimeout(this.$store.state.timer60)
              this.$store.state.timer60 = setTimeout(()=>{
                uni.reLaunch({
                  url: "/pages/index/index"
                })
              },60000)
            }
          },
          fail: (res)=>{
            if(uni.getStorageSync('key')){
              uni.reLaunch({
                url: "/pages/index/index"
              })
            }else{
              uni.reLaunch({
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
      	url: 'wss://www.bjzytctech.com:7502/websocket',
        // url: 'ws://192.168.31.88:9200/websocket',
      	complete: ()=> {}
      });
      var data = {
        mac: this.globalData.mac,
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
