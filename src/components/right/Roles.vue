<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <!-- 添加角色 -->
          <el-button type="primary" class="addRole-btn" @click="showAddRoleDialog()"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <roles-table ref="rolesTableRef"></roles-table>
    </el-card>
  </div>
</template>

<script>
const RolesTable = () => import("./RolesTable");
export default {
  created() {},
  components: {
    "roles-table": RolesTable
  },
  data() {
    return {};
  },
  methods: {
    /* async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色信息失败");
      }
      this.rolesList = res.data;
      console.log(this.rolesList);
    } */
    showAddRoleDialog() {
      this.$refs.rolesTableRef.showAddRoleDialog();
    }
  }
};
</script>

<style lang="scss" scoped></style>
