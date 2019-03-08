// 日志记录路由
export default {
  // path: "/log",
  // component: () => import("./../views/logs/index.vue"),
  // children: [{
  //   path: "stat",
  //   component: () => import("./../views/logs/stat.vue")
  // }],
  path: "/commit",
  component: () => import("./../views/commit/index.vue"),
  children: [{
    path: "code/count",
    component: () => import("./../views/logs/codeCount.vue")
  }]
}