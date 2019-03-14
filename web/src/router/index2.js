import Vue from 'vue'
import Router from 'vue-router'
import logRouter from './logRouter.js';
import commitRouter from "./commitRouter";

Vue.use(Router)

export default new Router({
  // 哈斯
  mode: 'hash',
  routes: [{
      // 重定向首页
      path: '/',
      redirect: '/login'
    },
    {
      // 登录
      path: '/login',
      component: () => import("./../views/account/login.vue")
    },
    logRouter, commitRouter
  ]
})