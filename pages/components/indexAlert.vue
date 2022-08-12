<template>
  <cover-view class="index_alert">
    <cover-view class="click_box" @click="getTouch" v-if="!isShowSelect"></cover-view>
		<cover-view class="options" v-if="isShowSelect">
			<cover-view class="t" @click.stop="closeClient" style="color:red">关闭应用</cover-view>
			<cover-view class="t" @click.stop="resetClient" style="color:#5bc335">重启应用</cover-view>
			<cover-view class="t" @click.stop="isShowSelect=false" style="color:black">关闭窗口</cover-view>
		</cover-view>
  </cover-view>
</template>

<script>
export default {
  name: 'index_alert',
  data () {
    return {
      isShowSelect: false,
      isShowConfirm: false,
      isShowOutConfirm: false,
			waitTime: 500,// 该时间间隔内点击才算连续点击（单位：ms）
			lastTime: null,
			count: 0, // 连续点击次数
    }
  },
  mounted(){

  },
  methods: {
		getTouch(){
			var that = this;
			var timer = null;
			if(!this.lastTime){
				this.lastTime = new Date().getTime()
			}
			// 获取对象
			var currentTime = new Date().getTime();
			// 计算两次相连的点击时间间隔
			this.count = (currentTime - this.lastTime) < this.waitTime ? this.count + 1 : 1;
			this.lastTime = new Date().getTime();
			clearTimeout(timer);
			timer = setTimeout(function() {
			  clearTimeout(timer);
			  if (that.count > 4) {
					setTimeout(()=>{
						that.isShowSelect = true
					},1000)
					that.count = 0
			  }
			}, this.waitTime + 10)
		},
    closeClient(){
			plus.runtime.quit()
		},
		resetClient(){
			plus.runtime.restart()
		},
  }
}
</script>

<style scoped lang="scss">
.index_alert {
  width: 15vw;
  height: 9vw;
  position: fixed;
  top: 1vw;
  left: 1vw;
  z-index: 1023;
  font-family: Arial, Helvetica, sans-serif;
	border-radius: 0.5vw;
	overflow: hidden;
	.click_box {
		width: 15vw;
		height: 9vw;
	}
	.options {
		width: 15vw;
		height: 9vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		color: #5bc335;
		.t {
			width: 15vw;
			height: 3vw;
			font-size: 1.2vw;
			line-height: 3vw;
			text-align: center;
			border-bottom: 1px solid #c3c3c3;
			box-sizing: border-box;
		}
	}
}
</style>
