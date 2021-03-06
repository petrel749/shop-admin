<template>
  <div>
    <!-- 添加参数对话框 -->
    <el-dialog
      v-if="handle === 'add'"
      :title="'添加' + getTitleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- :model="addFrom" :rules="addFromRules" ref="addFromRef"  v-model="addFrom.attr_name" -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="getTitleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClosed">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-else-if="handle === 'update'"
      :title="'修改' + getTitleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="updateDialogClosed"
    >
      <!-- :model="addFrom" :rules="addFromRules" ref="addFromRef"  v-model="addFrom.attr_name" -->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef" label-width="100px">
        <el-form-item :label="getTitleText" prop="attr_name">
          <el-input v-model="updateForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogClosed">取 消</el-button>
        <el-button type="primary" @click="updateParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["activeName", "cateId", "getParamsData", "handle"],
  data() {
    return {
      addDialogVisible: false,
      addForm: {
        attr_name: ""
      },
      addFormRules: {
        attr_name: [{ required: true, message: "请输入参数名称", trigger: "blur" }]
      },
      updateForm: {
        attr_name: ""
      },
      updateFormRules: {
        attr_name: [{ required: true, message: "请输入参数名称", trigger: "blur" }]
      }
    };
  },
  computed: {
    getTitleText() {
      if (this.activeName === "many") {
        return "动态参数";
      }
      return "静态属性";
    }
  },
  methods: {
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
      this.addDialogVisible = false;
    },
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields();
      this.addDialogVisible = false;
    },
    addParams() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        });
        if (res.meta.status !== 201) {
          return this.$message.error("添加参数失败！");
        }
        this.$message.success("添加参数成功！");
        this.addDialogVisible = false;
        this.getParamsData();
      });
    },
    updateParams() {
      this.$refs.updateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.updateForm.attr_id}`,
          {
            attr_name: this.updateForm.attr_name,
            attr_sel: this.activeName
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("修改参数失败！");
        }
        this.$message.success("修改参数成功！");
        this.getParamsData();
        this.addDialogVisible = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
