import Vue from "vue";
import VueRouter from "vue-router";

/* 实现懒加载模式 */
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ "../components/Login.vue");
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ "../components/Home.vue");
const Welcome = () =>
  import(/* webpackChunkName: "login_home_welcome" */ "../components/Welcome.vue");
const Users = () =>
  import(/* webpackChunkName: "Users_Rights_Roles" */ "../components/user/Users.vue");
const Rights = () =>
  import(/* webpackChunkName: "Users_Rights_Roles" */ "../components/right/Rights.vue");
const Roles = () =>
  import(/* webpackChunkName: "Users_Rights_Roles" */ "../components/right/Roles.vue");
// 商品种类页面
const CagePage = () => import(/* webpackChunkName: "Cate" */ "@v/goods/CatePage.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome
      },
      { path: "/users", component: Users },
      {
        path: "/rights",
        component: Rights
      },
      {
        path: "/roles",
        component: Roles
      },
      {
        path: "/categories",
        component: CagePage
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 挂载路由导航
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next是一个函数，代表放行
  //  next()代表放行  next('/login') 强制跳转

  if (to.path == "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
