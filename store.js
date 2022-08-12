import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
		timer60: null
	},
  mutations: {
    playTimer (state){
      state.timer60 = setTimeout(()=>{
        uni.reLaunch({
          url: "/pages/index/index"
        })
      },600000)
    },
    clearTimer (state) {
      clearTimeout(state.timer60)
    }
  }
})
export default store