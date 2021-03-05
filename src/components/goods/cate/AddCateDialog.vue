<template>
  <div>
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <!-- options：数据源 -->
          <!-- props：指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
            filterable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 对话框显示
      addCateDialogVisible: false,
      addCateForm: {
        // 分类名称
        cat_name: "",
        // 父级分类id
        cat_pid: 0,
        // 分类的登记。默认添加1级分类
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      },
      // 父级分类列表
      parentCateList: [],
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        chileren: "children"
      },
      // 选中父级分类的id数组
      selectedKeys: []
    };
  },
  methods: {
    showAddCateDialog() {
      this.getParentCateList();
      this.addCateDialogVisible = true;
    },
    // 关闭对话框并重置数据
    addCateDialogClosed() {
      this.addCateDialogVisible = false;
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },
    // 获取父级分类的数据
    async getParentCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 }
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取父级分类失败！");
      }
      this.parentCateList = res.data;
    },
    parentCateChanged() {
      console.log(this.selectedKeys);
      // selectedKeys的length大于0，则选中的父级分类，反之没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
        this.addCateForm.cat_level = this.selectedKeys.length;
      } else {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
    },
    // 添加分类
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("categories", this.addCateForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加分类失败！");
        }

        this.$message.success("添加分类成功！");
        this.$parent.getCateList();
        this.addCateDialogVisible = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
