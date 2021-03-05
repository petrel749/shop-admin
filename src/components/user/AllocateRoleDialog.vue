<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%" @close="setDialogClosed">
      <div>
        <p>当前用户：{{ userInfo.username }}</p>
        <p>当前角色：{{ userInfo.role_name }}</p>
        <p class="addRoleSelect">
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocateRole()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      // 被分配角色的用户信息
      userInfo: {},
      rolesList: [],
      selectedRoleId: ""
    };
  },
  methods: {
    showAllocateRoleDialog(role) {
      this.userInfo = role;
      this.dialogVisible = true;
      this.getRolesList();
    },
    async getRolesList() {
      let { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) this.$message.error("获取角色列表失败");
      this.rolesList = res.data;
    },
    setDialogClosed() {
      this.dialogVisible = false;
    },
    async allocateRole() {
      if (!this.selectedRoleId) {
        this.$message.error("请选择一个角色");
      }
      let { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, {
        rid: this.selectedRoleId
      });
      if (res.meta.status !== 200) {
        return this.$message.error("分配角色失败");
      }
      this.$message.success("分配角色成功");
      this.dialogVisible = false;
      this.$emit("getUserList");
    }
  }
};
</script>

<style lang="scss" scoped></style>
