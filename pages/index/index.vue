<template>
	<view class="app">
    <topTitle></topTitle>
    <view class="container">
      <view class="top">
        <view class="top_left">
          <view class="top_left_title">
            <text class="top_left_title_text">今日大牌</text>
            <image src="/static/img/mszq_img_icon_right.png" class="img_icon_right" mode="heightFix"></image>
          </view>
          <scroll-view class="scroll_box" scroll-x="true">
            <view class="item" v-for="(item,index) in dataList" :key="index">
              <view class="right_label">已售{{item.number}}份</view>
              <view class="title_groups">
                <view class="title_groups_title" v-html="item.title"></view>
                <view class="title_groups_bottom">
                  <view class="price">￥{{item.price}}</view>
                  <view class="buy_button" @click="goDetails(index)">立即抢购</view>
                </view>
              </view>
              <image :src="item.img" class="item_bg" mode="aspectFill"></image>
            </view>
          </scroll-view>
        </view>
        <view class="top_right">
          <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000"
            :duration="300">
            <swiper-item>
              <view class="swiper_item" @click="goDetails">
                <image src="/static/img/tuijian/swiper1.png" class="swiper_img" mode="aspectFill"></image>
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper_item" @click="goDetails">
                <image src="/static/img/tuijian/swiper2.png" class="swiper_img" mode="aspectFill"></image>
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper_item" @click="goDetails">
                <image src="/static/img/tuijian/swiper3.png" class="swiper_img" mode="aspectFill"></image>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view class="bottom">
        <view class="items" ref="items1" @click="jumpUrl(0)">
          <view class="left left1">
            <view class="title">优惠券</view>
            <view class="desc">周边美食净收眼底，<br>去吃去逛</view>
          </view>
          <view class="en_title">COUPON</view>
          <image src="/static/img/discounts/yhq.png" class="img" mode=""></image>
        </view>
        <view class="items" ref="items2" @click="jumpUrl(1)">
          <view class="left left2">
            <view class="title">美食</view>
            <view class="desc">周边美食净收眼底，<br>去吃去逛</view>
          </view>
          <view class="en_title">FOOD</view>
          <image src="/static/img/discounts/ms.png" class="img" mode=""></image>
        </view>
        <view class="items" ref="items3" @click="jumpUrl(2)">
          <view class="left left3">
            <view class="title">游玩</view>
            <view class="desc">周边美食净收眼底，<br>去吃去逛</view>
          </view>
          <view class="en_title">PLAY</view>
          <image src="/static/img/discounts/yw.png" class="img" mode=""></image>
        </view>
        <view class="items" ref="items4" @click="jumpUrl(3)">
          <view class="left left4">
            <view class="title">购物</view>
            <view class="desc">周边美食净收眼底，<br>去吃去逛</view>
          </view>
          <view class="en_title">SHOPPING</view>
          <image src="/static/img/discounts/gw.png" class="img" mode=""></image>
        </view>
      </view>
    </view>
    <floatMenu :level="1" @callBox="callBox"></floatMenu>
    <callBox v-if="isShowCallBox" @isCloseCallBox="isCloseCallBox"></callBox>
	</view>
</template>

<script>
  import indexAlert from '@/pages/components/indexAlert.vue'
  import floatMenu from '@/pages/components/floatMenu.vue'
  import callBox from '@/pages/components/callBox.vue'
  import topTitle from '@/pages/components/top_title.vue'
  
  import img1 from "@/static/img/tuijian/img1.png"
  import img2 from "@/static/img/tuijian/img2.png"
  import img3 from "@/static/img/tuijian/img3.png"
  import img4 from "@/static/img/tuijian/img4.png"
  import img5 from "@/static/img/tuijian/img5.png"
  
	export default {
    components: {
      indexAlert,
      floatMenu,
      callBox,
      topTitle
    },
		data() {
			return {
        isShowCallBox: false,
        dataList: [
          {title: "真地道京味府.鲜橙烤鸭<br>(西单店)",img: img1,price: "96", number: 731},
          {title: "沧狮门自助火锅鸡<br>(恒山东路旗舰店)",img: img2,price: "196", number: 305},
          {title: "绿茶餐厅<br>(石家庄万象城店)",img: img3,price: "35", number: 453},
          {title: "SEAS 抗衰美骨美肌中心<br>(万象城店)",img: img4,price: "28", number: 88},
          {title: "长藤密室<br>(勒泰店）",img: img5,price: "147", number: 512}
        ]
			}
		},
		onLoad() {
      
		},
    onShow() {
      this.$store.commit('clearTimer')
    },
		methods: {
      callBox(){
        this.isShowCallBox = true
      },
      isCloseCallBox(value){
        if(value === true){
          this.isShowCallBox = false
        }
      },
      jumpUrl(value){
        uni.navigateTo({
          url: `/pages/list/index?id=${value}`
        })
      },
      goDetails(index){
        const desc = this.dataList[index]
        uni.navigateTo({
          url: `/pages/details/index?title=${desc.title}&img=${desc.img}`
        })
      }
    },
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100vw;
    height: 100vh;
    background-image: url(/static/img/bg1.jpg);
    background-size: 100% 100%;
    .container {
      width: 90.3646vw;
      margin: 1.1vw 3vw 0 6.72vw;
      .top {
        height: 34.27vw;
        .top_left {
          float: left;
          width: 68.7vw;
          height: 34.27vw;
          background-image: url(/static/img/discounts/top_left_bg.png);
          background-size: 100% 100%;
          .top_left_title {
            width: 10.15vw;
            height: 2.5vw;
            margin-top: 1vw;
            margin-left: 1vw;
            line-height: 2.5vw;
            text-indent: 1vw;
            box-sizing: border-box;
            background-image: linear-gradient(to right, #01D8ED , transparent);
            border-radius: 0.3vw;
            position: relative;
            .img_icon_right {
              position: absolute;
              height: 2.5vw;
              right: -1.3vw;
              bottom: 0;
            }
            .top_left_title_text {
              font-family: YSBTH;
              font-size: 1.8vw;
              color: #fff;
              letter-spacing: 0.15vw;
            }
          }
          .scroll_box {
            width: 100%;
            white-space: nowrap;
            width: 66vw;
            margin: 1.6vw 0 0 2vw;
            .item {
              width: 18.18vw;
              height: 26.67vw;
              position: relative;
              display: inline-block;
              margin-right: 2vw;
              overflow: hidden;
              .right_label {
                position: absolute;
                background: linear-gradient(54deg, #9628EB 0%, #5B09FA 100%);
                right: 0;
                top: 0;
                line-height: 2.8vw;
                font-size: 1vw;
                color: #fff;
                padding: 0 1vw 0 1.2vw;
                border-bottom-left-radius: 1vw;
                z-index: 10;
              }
              .title_groups {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 8.5vw;
                width: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10;
                .title_groups_title {
                  color: #fff;
                  font-size: 1.25vw;
                  padding-right: 5.46vw;
                  padding-left: 0.9vw;
                  padding-top: 1vw;
                  box-sizing: border-box;
                }
                .title_groups_bottom {
                  overflow: hidden;
                  padding: 0 0.9vw;
                  box-sizing: border-box;
                  margin-top: 0.5vw;
                  .price {
                    font-size: 1.875vw;
                    color: #FFA944;
                    font-weight: bold;
                    float: left;
                  }
                  .buy_button {
                    margin-top: 0.5vw;
                    float: right;
                    padding: 0.2vw 1.25vw;
                    background: linear-gradient(54deg, #FF934C 0%, #FC686F 100%);
                    font-size: 0.9375vw;
                    color: #fff;
                    border-radius: 10vw;
                    cursor: pointer;
                  }
                }
              }
              .item_bg {
                width: 18.18vw;
                height: 26.67vw;
                object-fit: cover;
              }
            }
          }
        }
        .top_right {
          float: right;
          width: 20.3125vw;
          height: 34vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background-image: url(/static/img/discounts/top_right_bg.png);
          background-size: 100% 100%;
          .swiper {
            width: 17.6vw;
            height: 32vw;
            border-radius: 0.2vw;
            .swiper_item {
              width: 100%;
              height: 100%;
              .swiper_img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
      .bottom {
        margin-top: 1vw;
        height: 13.4vw;
        display: flex;
        justify-content: space-between;
        .items {
          width: 21.8vw;
          position: relative;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          .en_title {
            position: absolute;
            right: 1.46vw;
            bottom: 1.3vw;
            font-size: 1.5625vw;
            font-weight: bold;
            text-shadow: 0.2vw 0.2vw 0.2vw #4b4b4b;
          }
          .img {
            width: 98%;
            height: 98%;
            object-fit: cover;
          }
          .left {
            width: 10.365vw;
            height: 98%;
            position: absolute;
            left: 0.2vw;
            top: 0.1vw;
            padding: 2.8125vw 1vw 0 1.5vw;
            box-sizing: border-box;
            z-index: 10;
            .title {
              font-size: 2.1vw;
              text-shadow: 0.2vw 0.2vw 0.2vw #4b4b4b;
              position: relative;
              font-weight: bold;
              &::before {
                content: '';
                width: 2vw;
                height: 0.3vw;
                background: #fff;
                position: absolute;
                top: -0.8vw;
                left: 0.1vw;
                border-radius: 1vw;
              }
            }
            .desc {
              font-size: 0.83vw;
              margin-top: 3vw;
            }
          }
          .left1 {
            background: rgba(17, 53, 170, 0.7);
          }
          .left2 {
            background: rgba(188, 87, 26, 0.7);
          }
          .left3 {
            background: rgba(118, 34, 157, 0.7);
          }
          .left4 {
            background: rgba(159, 27, 27, 0.7);
          }
        }
      }
    }
  }
</style>
