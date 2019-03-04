import Vue from 'vue';
import router from './router';
import App from './App.vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/reset.less";
import "./assets/css/style.less";

Vue.config.productionTip = false
Vue.use(Element);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')