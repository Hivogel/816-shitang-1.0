<template>
	<view class="app" @click="clearAutoJump">
    <topTitle></topTitle>
    <view class="container">
      <view class="container_left">
        <view class="container_left_2">
          <view class="container_title">
            <text class="container_title_text">商品详情</text>
            <image src="/static/img/mszq_img_icon_right.png" class="img_icon_right" mode="heightFix"></image>
          </view>
          <view class="good_details">
            <view class="left">
              <view class="good_img">
                <view class="view_num">
                  <image src="/static/img/discounts/view_icon.png" class="view_icon" mode=""></image>
                  75
                </view>
                <view class="more_img" @click="showAlert">
                  <image src="/static/img/discounts/camera_icon.png" class="camera_icon" mode=""></image>
                  10
                </view>
                <image :src="currentData.img" class="img" mode=""></image>
              </view>
              <view class="ticket_list">
                <view class="ticket_list_li" v-for="(item,index) in 3" :key="index">
                  <view class="ticket_list_left">
                    <view class="ticket_num">
                      已售420份
                    </view>
                    <view class="ticket_text">
                      <text>98元</text><br>
                      <text>代金券</text>
                    </view>
                    <image class="ticket_bg" src="/static/img/discounts/ticket_bg.png" mode=""></image>
                  </view>
                  <view class="ticket_list_center">
                    <view class="title">京味斋·北京牡丹烤鸭</view>
                    <view class="title2">
                      <text>×2张</text>
                      <text>98元无门槛代金券</text>
                    </view>
                    <view class="title3">
                      <text>￥88</text>
                      <text>马上抢</text>
                    </view>
                  </view>
                  <view class="ticket_list_right">
                    <image class="erweima" src="/static/img/discounts/erweima.png" mode=""></image>
                    <view class="title">掌银扫码购买</view>
                  </view>
                </view>
              </view>
            </view>
            <view class="right">
              <view class="right_title" v-html="currentData.title"></view>
              <view class="right_desc">
                <view class="right_desc_left">
                  <view class="rate_box" v-for="(item,index) in 5">
                    <image class="icon" v-if="(index+1) > rateValue" src="/static/img/discounts/r0.png" mode=""></image>
                    <image class="icon" v-else src="/static/img/discounts/r1.png" mode=""></image>
                  </view>
                  {{rateValue}}分
                </view>
                <view class="right_desc_right">人均：560元</view>
              </view>
              <view class="right_address">
                <view class="right_address_ul">
                  <view class="right_address_li">
                    <!-- <a-icon type="environment" class="iconfont" /> -->
                    <image src="/static/img/discounts/address_icon.png" class="iconfont" mode="heightFix"></image>
                    <text>地址：朝阳区安苑东里1区2号楼</text>
                  </view>
                  <view class="right_address_li">
                    <!-- <a-icon type="phone" class="iconfont" /> -->
                    <image src="/static/img/discounts/tel_icon.png" class="iconfont" mode="heightFix"></image>
                    <text>电话：010-64988301</text>
                  </view>
                  <view class="right_address_li">
                    <!-- <a-icon type="history" class="iconfont" /> -->
                    <image src="/static/img/discounts/time_icon.png" class="iconfont" mode="heightFix"></image>
                    <text>营业时间：周一至周日 10:30-22:00</text>
                  </view>
                </view>
              </view>
              <view class="right_serve">
                <view class="right_serve_ul">
                  <view class="right_serve_li">
                    <image src="/static/img/discounts/wifi_icon.png" class="iconfont" mode="heightFix"></image>
                    <view>提供WIFI</view>
                  </view>
                  <view class="right_serve_li">
                    <image src="/static/img/discounts/stop_icon.png" class="iconfont" mode="heightFix"></image>
                    <view>提供车位</view>
                  </view>
                </view>
              </view>  
              <div class="right_map">
                <image src="/static/img/discounts/maps.jpg" class="map" mode=""></image>
              </div>
            </view>
          </view>
        </view>
      </view>
      <view class="container_right">
        <view class="container_right_2">
          <view class="container_title">
            <text class="container_title_text">热搜排行</text>
            <image src="/static/img/mszq_img_icon_right.png" class="img_icon_right" mode="heightFix"></image>
          </view>
          <view class="right_list">
            <view class="right_list_list" v-for="(item,index) in dataList" :key="'right_list'+index">
              <view class="lable">
                <view class="label_title">{{index+1}}</view>
                <image class="label_icon" src="/static/img/discounts/left_label.png" mode=""></image>
              </view>
              <view class="label_bottom_text">
                <view class="label_bottom_text_left">{{item.name}}</view>
                <view class="label_bottom_text_right">
                  <image src="/static/img/address_icon.png" class="iconfont" mode=""></image>
                  {{item.address}}
                </view>
              </view>
              <image :src="item.url" class="good_img" mode=""></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="alert_box" v-if="alertBox">
      <view class="top_box">
        <image :src="currentImg" class="currentImg" mode=""></image>
      </view>
      <view class="main_box">
        <swiper class="swiper" :duration="300" @change="getSwiperChange" :current="swiperCurrent">
          <swiper-item v-for="(item,index) in 3" class="swiper_item">
            <image v-for="(it,idx) in swiperList" :src="it" 
            :class="currentIndex == swiperList.length * swiperCurrent + idx ? 'swiper_img active':'swiper_img'" 
            @click="setCurrentIndex(idx)"></image>
          </swiper-item>
        </swiper>
        <image src="/static/img/discounts/l_s_icon.png" v-if="swiperCurrent > 0" @click="swiperPrev" class="left_icon" mode=""></image>
        <image src="/static/img/discounts/r_s_icon.png" v-if="swiperCurrent < 2" @click="swiperNext" class="right_icon" mode=""></image>
      </view>
      <image @click="closeAlert" src="/static/img/discounts/close_icon0.png" class="close_icon" mode=""></image>
    </view>
    <floatMenu :level="3" @callBox="callBox"></floatMenu>
    <indexAlert></indexAlert>
    <callBox v-if="isShowCallBox" @isCloseCallBox="isCloseCallBox"></callBox>
	</view>
</template>

<script>
  import indexAlert from '@/pages/components/indexAlert.vue'
  import floatMenu from '@/pages/components/floatMenu.vue'
  import callBox from '@/pages/components/callBox.vue'
  import topTitle from '@/pages/components/top_title.vue'
  
  const r1 = "/static/img/tuijian/r1.png";
  const r2 = "/static/img/tuijian/r2.png";
  const r3 = "/static/img/tuijian/r3.png";
  const r4 = "/static/img/tuijian/r4.png";
  const r5 = "/static/img/tuijian/r5.png";
  
  const img1 = "/static/img/discounts/img1.png";
  const img2 = "/static/img/discounts/img2.png";
  const img3 = "/static/img/discounts/img3.png";
  const img4 = "/static/img/discounts/img4.png";
  const img5 = "/static/img/discounts/img5.png";
  const img6 = "/static/img/discounts/img6.png";
  
	export default {
    components: {
      indexAlert,
      floatMenu,
      callBox,
      topTitle,
    },
		data() {
			return {
        dataList: [
          {name: '福口居（北太平庄店）',address: "国贸",url: r1},
          {name: '福口居（北太平庄店）',address: "国贸",url: r2},
          {name: '福口居（北太平庄店）',address: "国贸",url: r3},
          {name: '福口居（北太平庄店）',address: "国贸",url: r4},
          {name: '福口居（北太平庄店）',address: "国贸",url: r5}
        ],
        swiperList: [img1,img2,img3,img4,img5,img6],
        rateValue: 4,
        currentImg: null,
        alertBox: false,
        isShowCallBox: false,
        swiperCurrent: 0,
        currentIndex: 0,
        currentData: {}
			}
		},
		onLoad(options) {
      this.currentData = options
		},
    onShow(){
      this.currentImg = this.swiperList[0]
      this.$store.commit('clearTimer')
      this.$store.commit('playTimer')
    },
		methods: {
      clearAutoJump(){
        this.$store.commit('clearTimer')
        this.$store.commit('playTimer')
      },
      callBox(){
        this.isShowCallBox = true
      },
      isCloseCallBox(value){
        if(value === true){
          this.isShowCallBox = false
        }
      },
      swiperPrev(){
        this.swiperCurrent--
        if(this.swiperCurrent < 1) return
        // this.$router.push({path: '/discounts/discounts_list?type='+value})
      },
      swiperNext(){
        this.swiperCurrent++
        if(this.swiperCurrent > 3) return
      },
      setCurrentIndex(index){
        this.currentImg = this.swiperList[index]
        this.currentIndex = this.swiperCurrent * this.swiperList.length + index
      },
      getSwiperChange(e){
        this.swiperCurrent = e.detail.current
      },
      showAlert(){
        console.log(123)
        this.alertBox = true
      },
      closeAlert(){
        this.alertBox = false
      },
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
      overflow: hidden;
      width: 87.6vw;
      margin: 1.6vw auto 0 auto;
      .container_title {
        width: 10.15vw;
        height: 2.5vw;
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
        .container_title_text {
          font-family: YSBTH;
          font-size: 1.8vw;
          color: #fff;
          letter-spacing: 0.15vw;
        }
      }
      .container_left {
        float: left;
        width: 66.7vw;
        height: 48vw;
        background-image: url(/static/img/discounts/commodity_left_bg.png);
        background-size: 100% 100%;
        .container_left_2 {
          width: 66.7vw;
          height: 48vw;
          padding: 1.25vw 0 0 1vw;
          box-sizing: border-box;
          background-image: url(/static/img/discounts/commodity_left_bg_2.png);
          background-size: 100% 100%;
          .good_details {
            padding: 2vw 3.3vw 0 2.3vw;
            box-sizing: border-box;
            overflow: hidden;
            .left {
              width: 26.77vw;
              float: left;
              .good_img {
                width: 26.77vw;
                height: 17.76vw;
                border-radius: 0.5vw;
                overflow: hidden;
                position: relative;
                .view_num {
                  position: absolute;
                  top: 0.78125vw;
                  right: 0.78125vw;
                  padding: 0.325vw 0.625vw;
                  background: rgba(0, 0, 0, 0.7);
                  border-radius: 0.1vw;
                  font-size: 1vw;
                  color: #fff;
                  z-index: 10;
                  .view_icon {
                    width: 1.25vw;
                    height: 0.73vw;
                    margin-right: 0.2vw;
                  }
                }
                .more_img {
                  position: absolute;
                  bottom: 0.78125vw;
                  right: 0.78125vw;
                  padding: 0.325vw 0.625vw;
                  background: rgba(0, 0, 0, 0.7);
                  border-radius: 0.1vw;
                  font-size: 1vw;
                  color: #fff;
                  z-index: 10;
                  .camera_icon {
                    width: 1.355vw;
                    height: 1.146vw;
                    position: relative;
                    top: 0.15vw;
                    margin-right: 0.2vw;
                  }
                }
                .img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .ticket_list {
                margin-top: 1vw;
                height: 21.8vw;
                overflow-y: auto;
                &::-webkit-scrollbar {
                  width: 0 !important;
                }
                .ticket_list_li {
                  height: 8.646vw;
                  background: rgba(59, 133, 255, 0.1);
                  border: 1px solid #3963AE;
                  box-sizing: border-box;
                  border-radius: 0.2vw;
                  padding: 1.25vw 1.146vw;
                  color: #fff;
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 0.52vw;
                  .ticket_list_left {
                    width: 6.1vw;
                    height: 6.1vw;
                    border-radius: 0.2vw;
                    background: #185191;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .ticket_bg {
                      width: 5vw;
                      height: 3vw;
                    }
                    .ticket_num {
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      background: linear-gradient(30deg, #9929EA 0%, #5808FB 100%);
                      border-radius: 0 0.2vw 0 0.2vw;
                      font-size: 0.625vw;
                      padding: 0.1vw 0.4vw;
                    }
                    .ticket_text {
                      position: absolute;
                      top: 1.8vw;
                      left: 1.5vw;
                      font-size: 0.9375vw;
                      text-align: center;
                      border-left: 1px solid #fff;
                      padding-left: 0.5vw;
                      line-height: 1.3vw;
                      z-index: 10;
                    }
                  }
                  .ticket_list_center {
                    border-right: 1px solid #3963AE;
                    padding-right: 1.35vw;
                    padding-top: 0.5vw;
                    .title {
                      font-size: 0.83vw;
                    }
                    .title2 {
                      font-size: 0.73vw;
                      margin-top: 0.625vw;
                      text:nth-child(1){
                        background: #fff;
                        color: #FF7623;
                        padding: 0.1vw 0.5vw;
                        border-radius: 1vw;
                        margin-right: 0.5vw;
                      }
                    }
                    .title3 {
                      margin-top: 0.9375vw;
                      display: flex;
                      justify-content: space-between;
                      text:nth-child(1) {
                        font-size: 1.25vw;
                        color: #FF983D;
                      }
                      text:nth-child(2) {
                        font-size: 1vw;
                        background: linear-gradient(62deg, #FF934C 0%, #FC686F 100%);
                        height: 1.85vw;
                        line-height: 1.85vw;
                        display: inline-block;
                        padding: 0 1.25vw;
                        border-radius: 10vw;
                      }
                    }
                  }
                  .ticket_list_right {
                    text-align: center;
                    font-size: 0.83vw;
                    .erweima {
                      width: 4.375vw;
                      height: 4.375vw;
                    }
                  }
                }
              }
            }
            .right {
              width: 31vw;
              float: right;
              color: #fff;
              font-size: 0.9375vw;
              position: relative;
              .right_title {
                font-size: 1.5625vw;
                font-weight: bold;
              }
              .right_desc {
                display: flex;
                margin-top: 1vw;
                padding-bottom: 1.5vw;
                border-bottom: 1px solid #3963AE;
                .right_desc_left {
                  margin-right: 3vw;
                  
                  .rate_box {
                    width: 1vw;
                    height: 1vw;
                    display: inline-block;
                    margin-right: 0.3vw;
                    position: relative;
                    top: 0.2vw;
                    .icon {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }
              .right_address {
                font-size: 0.83vw;
                margin-top: 1.146vw;
                padding-bottom: 1.35vw;
                border-bottom: 1px solid #3963AE;
                .right_address_ul {
                  .right_address_li {
                    margin-bottom: 0.8vw;
                    &:last-child {
                      margin-bottom: 0;
                    }
                    .iconfont {
                      height: 1vw;
                      position: relative;
                      top: 0.2vw;
                      margin-right: 0.5vw;
                    }
                  }
                }
              }
              .right_serve {
                padding-top: 1vw;
                overflow: hidden;
                .right_serve_ul {
                  .right_serve_li {
                    font-size: 0.625vw;
                    width: 5vw;
                    // height: 5vw;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    .iconfont {
                      height: 1.6vw;
                      margin-bottom: 0.5vw;
                    }
                  }
                }
              }
              .right_map {
                width: 29.27vw;
                height: 21vw;
                margin-top: 1vw;
                border-radius: 1vw;
                overflow: hidden;
                .map {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
      .container_right {
        float: right;
        width: 19.2vw;
        height: 48vw;
        background-image: url(/static/img/discounts/commodity_right_bg.png);
        background-size: 100% 100%;
        .container_right_2 {
          width: 19.2vw;
          height: 48vw;
          padding: 1.25vw 0 0 1vw;
          box-sizing: border-box;
          background-image: url(/static/img/discounts/commodity_right_bg_2.png);
          background-size: 100% 100%;
          .right_list {
            height: 42.5vw;
            width: 15.4vw;
            margin: 1.05vw 3vw 0 0.5vw;
            padding: 0.3vw 0 0 0.3vw;
            overflow-y: auto;
            scroll-behavior: smooth;
            &::-webkit-scrollbar {
              width: 0 !important;
            }
            .right_list_list {
              width: 100%;
              height: 12.14vw;
              position: relative;
              margin-bottom: 0.725vw;
              &:last-child {
                margin-bottom: 0;
              }
              .lable {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 20;
                .label_title {
                  width: 2vw;
                  height: 3.646vw;
                  text-align: center;
                  line-height: 2.5vw;
                  position: absolute;
                  top: 0;
                  left: 0;
                  color: #fff;
                  font-size: 1.5625vw;
                }
                .label_icon {
                  width: 3.646vw;
                  height: 3.646vw;
                }
              }
              .good_img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .label_bottom_text {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 2.7vw;
                line-height: 2.7vw;
                color: #fff;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10;
                padding: 0 0.5vw;
                box-sizing: border-box;
                font-size: 0.9375vw;
                .label_bottom_text_left {
                  float: left;
                  width: 10vw;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
                .label_bottom_text_right {
                  float: right;
                  .iconfont {
                    width: 0.7vw;
                    height: 0.8vw;
                    margin-right: 0.3vw;
                    position: relative;
                    top: 0.1vw;
                  }
                }
              }
            }
          }
        }
      }
    }
    .alert_box {
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.8);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .top_box {
        width: 50vw;
        height: 33.49vw;
        margin-bottom: 2vw;
        .currentImg {
          width: 100%;
          height: 100%;
        }
      }
      .main_box {
        width: 80.88vw;
        height: 8.646vw;
        position: relative;
        .left_icon {
          width: 0.83vw;
          height: 1.46vw;
          position: absolute;
          left: 0.88vw;
          top: 50%;
          transform: translate(0,-50%);
          z-index: 10;
        }
        .right_icon {
          width: 0.83vw;
          height: 1.46vw;
          position: absolute;
          right: 0.88vw;
          top: 50%;
          transform: translate(0,-50%);
          z-index: 10;
        }
        .swiper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          .swiper_item {
            width: 12.917vw;
            height: 8.646vw;
            .swiper_img {
              width: 12.917vw;
              height: 8.646vw;
              object-fit: cover;
              margin-right: 0.67vw;
              position: relative;
              &:last-child {
                margin-right: 0;
              }
            }
            .active {
              &::before {
                content: '';
                width: 12.917vw;
                height: 8.646vw;
                border: 0.2vw solid #01D8ED;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
              }
            }
          }
        }
      }
      .close_icon {
        margin-top: 2vw;
        width: 7vw;
        height: 7vw;
      }
    }
  }
</style>
