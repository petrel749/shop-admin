<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <!--侧边栏菜单区域-->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="this.$route.path.replace('/', '')"
    >
      <!--1级菜单
              index只接收字符串
          -->
      <el-submenu v-for="menu in menuList" :key="menu.id" :index="menu.id + ''">
        <!--1级菜单模板区域-->
        <template slot="title">
          <!--图标-->
          <!-- <i :class="iconsObj[menu.id]"></i> -->
          <i class="el-icon-yonghu"></i>
          <!--文本-->
          <span>{{ menu.authName }}</span>
        </template>
        <!--2级菜单
            @click="saveNavState('/' + subMenu.path)"-->
        <el-menu-item :index="'' + subMenu.path" v-for="subMenu in menu.children" :key="subMenu.id">
          <template slot="title">
            <!--图标-->
            <i class="el-icon-menu"></i>
            <!--文本-->
            <span>{{ subMenu.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  created() {
    this.getMenuList();
  },
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        "125": "el-icon-yonghu",
        "103": "el-icon-ali-quanxian",
        "101": "el-icon-ali-yonghu",
        "102": "el-icon-ali-yonghu",
        "145": "el-icon-ali-yonghu"
      },
      // 是否折叠
      isCollapse: false
    };
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.menuList = res.data;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
