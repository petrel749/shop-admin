<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%" @close="dialogClosed">
      <!-- 显示树形控件 -->
      <el-tree
        ref="treeRef"
        :data="allocateRightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocateRights()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      allocateRightsList: [],
      // 树形控件
      treeProps: {
        label: "authName",
        children: "children"
      },
      // 默认选中的节点
      defKeys: [],
      roleId: ""
    };
  },
  methods: {
    dialogClosed() {},

    getTreeList(node) {
      if (!node.children) {
        return this.defKeys.push(node.id);
      }
      node.children.forEach((item) => this.getTreeList(item));
    },
    async getAllocateRightsList() {
      this.defKeys = [];
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200) return;
      this.allocateRightsList = res.data;
    },
    getRoleId(id) {
      this.roleId = id;
    },
    async allocateRights() {
      const treeKeys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      console.log(treeKeys);
      console.log(this.roleId);
      const idStr = treeKeys.join(",");
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr });
      if (res.meta.status !== 200) return this.$message.error("分配权限失败");
      this.$message.success("分配权限成功");
      this.dialogVisible = false;
      this.$parent.getRolesList();
    }
  }
};
</script>
