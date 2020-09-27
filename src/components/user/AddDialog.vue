<template>
  <!-- 关闭表单清空 -->
  <el-dialog title="添加用户" :visible.sync="dialogVisble" width="30%" @close="dialogClosed">
    <!--内容主体区域-->
    <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisble = false">取 消</el-button>
      <el-button type="primary" @click="addUser()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["userList"],
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
      dialogVisble: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6~15个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
          /* validator: checkEmail, */
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
          /* validator: checkMobile, */
        ]
      }
    };
  },
  methods: {
    dialogClosed() {
      this.$refs.addRef.resetFields();
    },
    addUser() {
      this.$refs.addRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return;
        // 可以发起添加用户的请求
        const { data: res } = await this.$http.post("users", this.addForm);
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error("添加用户失败！");
        this.$message.success("添加用户成功!");
        // 隐藏添加用户的对话框
        this.dialogVisble = false;
        this.$parent.$parent.getUserList();
      });
    }
  }
};
</script>
