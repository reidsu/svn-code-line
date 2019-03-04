// 日志记录路由
export default {
  path: "/log",
  component: () => import("./../views/logs/index.vue"),
  children: [{
    path: "stat",
    component: () => import("./../views/logs/stat.vue")
  }]
}