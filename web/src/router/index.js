import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 哈斯
  mode: 'hash',
  routes: [{
      // 重定向首页
      path: '/',
      redirect: '/svnExit'
    },
    {
      path: '/svnExit',
      component: () => import("./../views/account/svnExit.vue")
    },
    {
      path: '/home',
      component: () => import("./../views/home.vue"),
      children: [{
          path: 'branches',
          component: () => import("./../views/branches/index"),
          children: [{
              path: 'addBranches',
              name: 'addBranches',
              component: () => import("./../views/branches/addBranches.vue"),
            },
            {
              path: 'codeCount',
              name: 'codeCount',
              component: () => import("./../views/branches/codeCount.vue"),
            }
          ]
        },
        {
          path: 'manage',
          component: () => import("./../views/manage/index.vue"),
          children: [{
            path: 'editManage',
            name: 'editManage',
            component: () => import("./../views/manage/editManage.vue"),
          }]
        },
        {
          path: "commit",
          name: "commit",
          component: () => import("./../views/commit/index.vue"),
          children: [
            {
              path: 'commitCodeCount',
              name: 'commitCodeCount',
              component: () => import("./../views/branches/codeCount.vue"),
            }
          ]
        }
      ]
    },
  ]
})