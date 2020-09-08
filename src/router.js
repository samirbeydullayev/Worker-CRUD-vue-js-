import Vue from "vue"
import VueRouter from "vue-router"


import Category from "./components/Category"
import Worker from "./components/Worker"



Vue.use(VueRouter);


const routes = [{
    path: "/",
    component: Worker,
    alias: '/workers'
  },
  {
    path: "/categories",
    component: Category
  },
]

export const router = new VueRouter({
  mode: "history",
  routes
})
