<template>
  <el-container class="home-container">
    <el-header>
      <div class="">
        <img src="../assets/logo.png" alt="shop-admin" />
        <router-link to="/home"><span>管理系统</span></router-link>
      </div>
      <el-button type="info" @click="logOut">退出</el-button></el-header
    >
    <el-container>
      <aside-component></aside-component>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const Aside = () => import("./Aside");
export default {
  created() {
    // this.getMenuList();
  },
  components: {
    "aside-component": Aside
  },
  data() {
    return {};
  },
  methods: {
    logOut() {
      setTimeout(() => {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }, 1000);
    },
    /* async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.menuList = res.data;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }, */
    saveNavState(path) {
      window.sessionStorage.setItem("activePath", path);
    }
  }
};
</script>

<style lang="scss" scoped>
$header-color: #373d41;
$aside-color: #333744;
$main-color: #eaedf1;
.home-container {
  height: 100%;
}
.el-header {
  background-color: $header-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      color: #ffffff;
      font-size: 20px;
      text-align: center;
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: $aside-color;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: $main-color;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
