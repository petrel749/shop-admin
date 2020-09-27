<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="queryInfo.query"
            @clear="getUserList()"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisble()">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="角色状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeUserState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑信息" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除信息" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                content="Top Center 删除"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" :enterable="false">
              <el-button
                type="info"
                icon="el-icon-setting"
                size="small"
                content="Top Center 分配"
                @click="showAllocateRoleDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加角色的对话框 -->
      <add-dialog ref="refadd" :userList="userList"></add-dialog>
      <!-- 编辑角色对话框 -->
      <EditDialog ref="editRef"></EditDialog>
      <AllocateRoleDialog ref="allocateRoleDialogRef"></AllocateRoleDialog>
    </el-card>
  </div>
</template>

<script>
const AddDialog = () => import("../user/AddDialog");
const EditDialog = () => import("../user/EditDialog");
const AllocateRoleDialog = () => import("./AllocateRoleDialog");
export default {
  created() {
    this.getUserList();
  },
  components: {
    "add-dialog": AddDialog,
    EditDialog: EditDialog,
    AllocateRoleDialog: AllocateRoleDialog
  },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0
    };
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200) this.$message.error("获取用户信息失败");
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听用户状态
    async changeUserState(userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      this.$message.success("更新用户状态成功！");
    },
    addDialogVisble() {
      this.$refs.refadd.dialogVisble = true;
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status !== 200) return this.$message.error("查询用户信息失败!");

      this.$refs.editRef.editForm = res.data;
      this.$refs.editRef.dialogVisible = true;
    },
    showAllocateRoleDialog(role) {
      this.$refs.allocateRoleDialogRef.showAllocateRoleDialog(role);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 15px;
}
.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
