<template>
  <div>
    <el-table :data="rolesList" border stripe>
      <!-- 扩展表 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            :class="['bdbottom', i1 == 0 ? 'bdtop' : '', 'vcenter']"
            v-for="(item1, i1) in scope.row.children"
            :key="item1.id"
          >
            <!--渲染一级权限-->
            <el-col :span="5">
              <el-tag>{{ item1.authName }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!--渲染二级和三级权限-->
            <el-col :span="19">
              <!--通过for循环嵌套渲染二级权限-->
              <el-row
                :class="[i2 == 0 ? '' : 'bdtop', 'vcenter']"
                v-for="(item2, i2) in item1.children"
                :key="item2.id"
              >
                <el-col :span="6">
                  <el-tag type="success">{{ item2.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!--通过for循环嵌套渲染三级权限-->
                <el-col :span="18">
                  <el-tag
                    closable
                    @close="removeRightById(scope.row, item3.id)"
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
          <el-button
            type="warning"
            icon="el-icon-search"
            @click="showAllocateRightsDialog(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <add-role-dialog ref="addRoleDialogRef"></add-role-dialog>
    <allocate-rights-dialog ref="allocateRightsDialogRef"></allocate-rights-dialog>
  </div>
</template>

<script>
const AllocateRightsDialog = () => import("./AllocateRightsDialog");
const AddRoleDialog = () => import("./AddRoleDialog");
export default {
  created() {
    this.getRolesList();
  },
  components: {
    "add-role-dialog": AddRoleDialog,
    "allocate-rights-dialog": AllocateRightsDialog
  },
  data() {
    return {
      rolesList: []
    };
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色信息失败");
      }
      this.rolesList = res.data;
      console.log(this.rolesList);
    },
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm("是否删除权限", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.error("取消删除");
      }
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除删除成功");
      role.children = res.data;
    },
    showAllocateRightsDialog(role) {
      this.$refs.allocateRightsDialogRef.roleId = role.id;
      this.$refs.allocateRightsDialogRef.getAllocateRightsList();
      this.$refs.allocateRightsDialogRef.getTreeList(role);
      this.$refs.allocateRightsDialogRef.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
