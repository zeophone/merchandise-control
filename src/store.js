import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const logPlugin = (store)=>{
  store.subscribe((mutation,state)=>{
    console.log('store changed...',mutation,state)
  })
}

export default new Vuex.Store({
  plugins: [logPlugin],
  state:{
    user: null,
    isLoading: false
  },
  getters:{
  },
  mutations:{
  },
  actions:{
  },
  modules: {
  }

})
