// 日志记录路由
export default {
  // path: "/log",
  // component: () => import("./../views/logs/index.vue"),
  // children: [{
  //   path: "stat",
  //   component: () => import("./../views/logs/stat.vue")
  // }],
  path: "/home",
  component: () => import("./../views/logs/home.vue"),
  children: [{
    path: "stat",
    component: () => import("./../views/logs/stat.vue")
  }, {
    path: "group/add",
    component: () => import("./../views/logs/addGroup.vue")
  }, {
    path: "group/edit",
    component: () => import("./../views/logs/addGroup.vue")
  }, {
    path: "branch/add",
    component: () => import("./../views/logs/addBranch.vue")
  }]
}