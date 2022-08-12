<template>
	<view class="app" @click="clearAutoJump">
    <topTitle></topTitle>
    <view class="container">
      <view class="container_title">
        <text class="container_title_text">美食</text>
        <image src="/static/img/mszq_img_icon_right.png" class="img_icon_right" mode="heightFix"></image>
      </view>
      <view class="bottom_container">
        <view class="list_left">
          <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000"
            :duration="300">
            <swiper-item>
              <view class="swiper_item" @click="getDetails">
                <image src="/static/img/tuijian/swiper1.png" class="swiper_img" mode="aspectFill"></image>
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper_item" @click="getDetails">
                <image src="/static/img/tuijian/swiper2.png" class="swiper_img" mode="aspectFill"></image>
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper_item" @click="getDetails">
                <image src="/static/img/tuijian/swiper3.png" class="swiper_img" mode="aspectFill"></image>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <view class="list_right">
          <view v-for="(item,index) in 4" key="index">
            <view class="list_box" v-if="index == currentIndex">
              <view class="top_list">
                <view class="good_items" :class="'item'+(index+1)" v-for="(item,index) in dataList" :key="index" @click="getDetails(index)">
                  <view class="label">
                    <image src="/static/img/mszq_xszk_icon.png" class="label_icon" mode="aspectFit"></image>
                    <view class="label_text">今日推荐</view>
                  </view>
                  <view class="title_groups">
                    <view class="t1">{{item.title}}</view>
                    <view class="t2">
                      <view class="t2_left">
                        <text>￥{{item.price}}/人</text>
                        <text>￥58/人</text>
                      </view>
                      <view class="t2_right">
                        <image src="/static/img/address_icon.png" class="iconfont" mode=""></image>
                        <!-- <a-icon class="iconfont" type="environment" /> -->
                        <text>{{item.address}}</text>
                      </view>
                    </view>
                  </view>
                  <image :src="item.img" class="good_items_bg" mode="aspectFill"></image>
                </view>
              </view>
              <view class="bottom_list">
                <view class="good_items" :class="'item'+(index+1)" v-for="(item,index) in dataList2" :key="index" @click="getDetails2(index)">
                  <view class="label">
                    <image src="/static/img/mszq_xszk_icon.png" class="label_icon" mode="aspectFit"></image>
                    <view class="label_text">今日推荐</view>
                  </view>
                  <view class="title_groups">
                    <view class="t1">{{item.title}}</view>
                    <view class="t2">
                      <view class="t2_left">
                        <text>￥{{item.price}}/人</text>
                        <text>￥58/人</text>
                      </view>
                      <!-- <view class="t2_right">
                        <image src="/static/img/address_icon.png" class="iconfont" mode=""></image>
                        <text>{{item.address}}</text>
                      </view> -->
                    </view>
                  </view>
                  <image :src="item.img" class="good_items_bg" mode="aspectFill"></image>
                </view>
              </view>
            </view>
          </view>
          
          <view class="menu_box">
            <view v-if="currentIndex != 0" class="bottom_menu_item" @click="currentIndex = 0">
              <view class="title">优惠券</view>
              <image src="/static/img/discounts/list_menu_bg.png" class="default_img" mode=""></image>
            </view>
            <view v-else class="bottom_menu_item_active">
              <view class="title">优惠券</view>
            </view>
            <view v-if="currentIndex != 1" class="bottom_menu_item" @click="currentIndex = 1">
              <view class="title">美食</view>
              <image src="/static/img/discounts/list_menu_bg.png" class="default_img" mode=""></image>
            </view>
            <view v-else class="bottom_menu_item_active">
              <view class="title">美食</view>
            </view>
            <view v-if="currentIndex != 2" class="bottom_menu_item" @click="currentIndex = 2">
              <view class="title">游玩</view>
              <image src="/static/img/discounts/list_menu_bg.png" class="default_img" mode=""></image>
            </view>
            <view v-else class="bottom_menu_item_active">
              <view class="title">游玩</view>
            </view>
            <view v-if="currentIndex != 3" class="bottom_menu_item" @click="currentIndex = 3">
              <view class="title">购物</view>
              <image src="/static/img/discounts/list_menu_bg.png" class="default_img" mode=""></image>
            </view>
            <view v-else class="bottom_menu_item_active">
              <view class="title">购物</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <floatMenu></floatMenu>
    <indexAlert></indexAlert>
    <floatCall @click.native="callBox"></floatCall>
    <callBox v-if="isShowCallBox" @isCloseCallBox="isCloseCallBox"></callBox>
	</view>
</template>

<script>
  import indexAlert from '@/pages/components/indexAlert.vue'
  import floatCall from '@/pages/components/floatCall.vue'
  import callBox from '@/pages/components/callBox.vue'
  import topTitle from '@/pages/components/top_title.vue'
  
  import floatMenu from '@/pages/components/floatMenu.vue'
  
  import img1 from "@/static/img/tuijian/img1.png"
  import img2 from "@/static/img/tuijian/img2.png"
  import img3 from "@/static/img/tuijian/img3.png"
  import img4 from "@/static/img/tuijian/img4.png"
  import img5 from "@/static/img/tuijian/img5.png"
  import img6 from "@/static/img/tuijian/img6.png"
  import img7 from "@/static/img/tuijian/img7.png"
  import img8 from "@/static/img/tuijian/img8.png"
  
  
	export default {
    components: {
      indexAlert,
      floatCall,
      callBox,
      topTitle,
      floatMenu
    },
		data() {
			return {
        isShowCallBox: false,
        currentIndex: 0,
        dataList: [
          {title: "真地道京味府.鲜橙烤鸭(西单店)",img: img1,price: "96", address: "文昌胡同"},
          {title: "沧狮门自助火锅鸡(恒山东路旗舰店)",img: img2,price: "196", address: "恒山东路"},
          {title: "绿茶餐厅(石家庄万象城店)",img: img3,price: "35", address: "华润万象城"},
          {title: "SEAS 抗衰美骨美肌中心(万象城店)",img: img4,price: "28", address: "华润万象城"},
          {title: "长藤密室(勒泰店）",img: img5,price: "147", address: "华润万象城"},
          {title: "聚十三烤肉博物馆（东大桥店）",img: img6,price: "152", address: "东大桥"},
        ],
        dataList2: [
          {title: "真地道京味府.鲜橙烤鸭(西单店)",img: img1,price: "96", address: "文昌胡同"},
          {title: "沧狮门自助火锅鸡(恒山东路旗舰店)",img: img2,price: "196", address: "恒山东路"},
          {title: "绿茶餐厅(石家庄万象城店)",img: img3,price: "35", address: "华润万象城"},
          {title: "SEAS 抗衰美骨美肌中心(万象城店)",img: img4,price: "28", address: "华润万象城"},
          {title: "长藤密室(勒泰店）",img: img5,price: "147", address: "华润万象城"},
          {title: "聚十三烤肉博物馆（东大桥店）",img: img6,price: "152", address: "东大桥"},
          {title: "重山钵钵",img: img7,price: "131", address: "朝阳剧场"},
          {title: "闻芷竹院.江南食居（十里堡店）",img: img5,price: "269", address: "万科时代中心"},
        ]
			}
		},
		onLoad(options) {
      this.currentIndex = options.id
		},
    onShow(){
      this.$store.commit('clearTimer')
      this.$store.commit('playTimer')
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
      getDetails(index){
        const desc = this.dataList[index]
        uni.navigateTo({
          url: `/pages/details/index?title=${desc.title}&img=${desc.img}`
        })
      },
      getDetails2(index){
        const desc = this.dataList2[index]
        uni.navigateTo({
          url: `/pages/details/index?title=${desc.title}&img=${desc.img}`
        })
      },
      // 60s 无操作
      clearAutoJump(){
        this.$store.commit('clearTimer')
        this.$store.commit('playTimer')
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
      width: 88.38vw;
      height: 48.75vw;
      margin: 0.677vw 3.4375vw 0 8.177vw;
      padding-top: 1vw;
      box-sizing: border-box;
      background-image: url(/static/img/discounts/list_bg.png);
      background-size: 100% 100%;
      .container_title {
        width: 10.15vw;
        height: 2.5vw;
        margin-left: 1vw;
        line-height: 2.5vw;
        text-indent: 3vw;
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
      .bottom_container {
        margin-top: 1.5vw;
        padding: 0 2.6vw;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .list_left {
          width: 22.6vw;
          height: 40.2vw;
          border-radius: 0.5vw;
          box-shadow: 0px 0px 1vw 0.1vw rgba(181,250,255,0.75);
          -webkit-box-shadow: 0px 0px 1vw 0.1vw rgba(181,250,255,0.75);
          -moz-box-shadow: 0px 0px 1vw 0.1vw rgba(181,250,255,0.75);
          position: relative;
          overflow: hidden;
          .swiper {
            width: 100%;
            height: 100%;
            .swiper_item {
              width: 100%;
              height: 100%;
              .swiper_img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        .list_right {
          width: 58vw;
          height: 40.73vw;
          .list_box {
            width: 59vw;
            height: 37.73vw;
            padding-left: 1vw;
            box-sizing: border-box;
            overflow-y: auto;
            position: relative;
            left: -1vw;
            .top_list {
              width: 100%;
              height: 33vw;
              position: relative;
              .good_items {
                position: relative;
                border-radius: 0.5vw;
                .label {
                  position: absolute;
                  top: -0.3vw;
                  left: -0.3vw;
                  z-index: 10;
                  .label_icon {
                    width: 4.1vw;
                    height: 4.1vw;
                  }
                  .label_text {
                    font-size: 0.625vw;
                    color: #fff;
                    position: absolute;
                    top: 1.1vw;
                    left: -0.2vw;
                    transform: rotate(-45deg);
                    font-family: FZZY;
                    z-index: 10;
                  }
                }
                .title_groups {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  height: 4.58vw;
                  width: 100%;
                  background: rgba(0, 0, 0, 0.8);
                  color: #fff;
                  border-bottom-left-radius: 0.5vw;
                  border-bottom-right-radius: 0.5vw;
                  padding: 0.88vw 0.8vw;
                  box-sizing: border-box;
                  z-index: 20;
                  .t1 {
                    font-size: 1vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  .t2 {
                    display: flex;
                    justify-content: space-between;
                    .t2_left text:nth-child(1){
                      font-size: 1.25vw;
                      color: #FF983D;
                      font-weight: bold;
                    }
                    .t2_left text:nth-child(2){
                      font-size: 0.73vw;
                      color: #666666;
                      font-weight: bold;
                      text-decoration: line-through;
                      margin-left: 0.4vw;
                    }
                    .t2_right {
                      font-size: 0.73vw;
                      color: #ACC0E7;
                      position: relative;
                      top: 0.8vw;
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
                .good_items_bg {
                  width: 100%;
                  height: 100%;
                  border-radius: 0.5vw;
                  object-fit: cover;
                }
              }
              .item1 {
                width: 23vw;
                height: 15.68vw;
                position: absolute;
                top: 0;
                left: 0;
              }
              .item2 {
                width: 23vw;
                height: 15.68vw;
                position: absolute;
                left: 0;
                bottom: 0;
              }
              .item3 {
                position: absolute;
                width: 17.86vw;
                height: 19vw;
                left: 24.58vw;
                top: 0;
              }
              .item4 {
                position: absolute;
                width: 17.86vw;
                height: 12.55vw;
                left: 24.58vw;
                bottom: 0;
              }
              .item5 {
                position: absolute;
                width: 13.85vw;
                height: 15.67vw;
                right: 0;
                top: 0;
              }
              .item6 {
                position: absolute;
                width: 13.85vw;
                height: 15.67vw;
                right: 0;
                bottom: 0;
              }
            }
            .bottom_list {
              margin-top: 0.8vw;
              width: 100%;
              position: relative;
              .good_items {
                width: 24.25%;
                margin-right: 1%;
                margin-bottom: 0.8vw;
                position: relative;
                border-radius: 0.5vw;
                height: 10vw;
                float: left;
                &:nth-child(4n){
                  margin-right: 0;
                }
                .label {
                  position: absolute;
                  top: -0.3vw;
                  left: -0.3vw;
                  z-index: 10;
                  .label_icon {
                    width: 4.1vw;
                    height: 4.1vw;
                  }
                  .label_text {
                    font-size: 0.625vw;
                    color: #fff;
                    position: absolute;
                    top: 1.1vw;
                    left: -0.2vw;
                    transform: rotate(-45deg);
                    font-family: FZZY;
                    z-index: 10;
                  }
                }
                .title_groups {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  height: 4.58vw;
                  width: 100%;
                  background: rgba(0, 0, 0, 0.8);
                  color: #fff;
                  border-bottom-left-radius: 0.5vw;
                  border-bottom-right-radius: 0.5vw;
                  padding: 0.88vw 0.8vw;
                  box-sizing: border-box;
                  z-index: 20;
                  .t1 {
                    font-size: 1vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  .t2 {
                    display: flex;
                    justify-content: space-between;
                    .t2_left text:nth-child(1){
                      font-size: 1.25vw;
                      color: #FF983D;
                      font-weight: bold;
                    }
                    .t2_left text:nth-child(2){
                      font-size: 0.73vw;
                      color: #666666;
                      font-weight: bold;
                      text-decoration: line-through;
                      margin-left: 0.4vw;
                    }
                    .t2_right {
                      font-size: 0.73vw;
                      color: #ACC0E7;
                      position: relative;
                      top: 0.8vw;
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
                .good_items_bg {
                  width: 100%;
                  height: 100%;
                  border-radius: 0.5vw;
                  object-fit: cover;
                }
              }
            }
          }
          .menu_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .bottom_menu_item {
              margin-top: 1.146vw;
              width: 13.18vw;
              height: 3.23vw;
              position: relative;
              .title {
                position: absolute;
                height: 100%;
                width: 100%;
                line-height: 3.23vw;
                color: #fff;
                text-align: center;
                font-size: 1.146vw;
                top: 0;
                left: 0;
              }
              .default_img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .bottom_menu_item_active {
              width: 12.8125vw;
              height: 4.74vw;
              position: relative;
              background-image: url(/static/img/discounts/list_menu_bg_active.png);
              background-size: 105% 105%;
              background-position: center;
              .title {
                position: absolute;
                top: 2vw;
                left: 0;
                width: 100%;
                color: #00E5F6;
                font-size: 1.146vw;
                text-align: center;
              }
              .active_img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
      
    }
  }
</style>
