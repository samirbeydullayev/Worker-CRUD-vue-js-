import Vue from "vue";
import Vuex from "vuex";
import category from "./modules/category";
import worker from "./modules/worker";



Vue.use(Vuex);



export const store = new Vuex.Store({

  getters:{

  },
  mutations:{

  },
  actions:{

  },
  modules: {
    category,
    worker
  }



})
