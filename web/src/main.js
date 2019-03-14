import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import Element from "element-ui";
import VueBus from 'vue-bus';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/reset.less";
import "./assets/css/style.less";

Vue.use(Element);
Vue.use(VueBus);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
