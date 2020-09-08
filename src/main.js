import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import {router} from "./router"
import {store} from "./store/store"
import "./vee-validate"

export const EventBus = new Vue();

axios.defaults.baseURL = "Your Firebase url";



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
