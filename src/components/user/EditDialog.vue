<template>
  <!--修改用户的对话框-->
  <el-dialog
    title="修改用户信息"
    :visible.sync="dialogVisible"
    @open="showEditDialog"
    v-if="dialogVisible"
    width="50%"
    @close="dialogClosed"
  >
    <!--内容主体区域-->
    <el-form :model="editForm" :rules="editRules" ref="editRef" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!--底部区域-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["editUserId"],
  data() {
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    const checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        // 合法的手机号码
        return cb();
      }
      cb(new Error("手机号码格式不正确"));
    };
    return {
      dialogVisible: false,
      editForm: {
        username: "",
        mobile: "",
        email: ""
      },
      editRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    dialogClosed() {
      this.$refs.editRef.resetFields();
    },
    async getUserById(id) {
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status !== 200) this.$message.error("查询用户信息失败!");
      this.editForm.username = res.data.username;
      this.editForm.email = res.data.email;
      this.editForm.mobile = res.data.mobile;
    },
    showEditDialog() {
      this.getUserById(this.editUserId);
      setTimeout(() => {
        this.dialogVisible = true;
      }, 0);
    },
    editUserInfo() {
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(`users/${this.editUserId}`, this.editForm);

        if (res.meta.status !== 201) this.$message.error("添加用户失败！");
        this.$message.success("修改信息成功!");
        this.dialogVisible = false;
        this.$parent.$parent.getUserList();
      });
    }
  },
  watch: {
    editUserId() {
      this.showEditDialog();
    }
  }
};
</script>
