import Vue from "vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./plugins/element.js";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import "element-ui/lib/theme-chalk/index.css";
import TreeTable from "vue-table-with-tree-grid";
// 导入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
// 导入富文本编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
/* axios.create({
  baseURL: "http://timemeetyou.com:8889/api/private/v1/",
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
  timeout: 10000,
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  }
}); */

// axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/";
// axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
axios.defaults.baseURL = "http://www.ysqorz.top:8888/api/private/v1/";
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.component("tree-table", TreeTable);
Vue.use(VueQuillEditor);
// 自定义格式化时间的全局过滤器
Vue.filter("dateFormat", function (originVal) {
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  const m = `${dt.getMonth() + 1}`.padStart(2, "0");
  const d = `${dt.getDate()}`.padStart(2, "0");
  // padStart(2,'0') 意思是不足两位自动补0
  const hh = `${dt.getHours()}`.padStart(2, "0");
  const mm = `${dt.getMinutes()}`.padStart(2, "0");
  const ss = `${dt.getSeconds()}`.padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
