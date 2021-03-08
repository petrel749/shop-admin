<template>
  <div>
    <el-dialog
      title="修改地址"
      :visible.sync="addressDialogVisible"
      width="50%"
      @close="addressDialogClosed"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <!-- :props="{ expandTrigger: 'hover' }" -->
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// const cityData = () => import(/* webpackChunkName: "Order" */ "./citydata.js");
import cityData from "./citydata.js";
export default {
  data() {
    return {
      // 修改地址对话框
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: ""
      },
      addressFormRules: {
        address1: [{ required: true, message: "请选择省市区县", trigger: "blur" }],
        address2: [{ required: true, message: "请输入详细地址", trigger: "blur" }]
      },
      cityData
    };
  },
  methods: {
    // 关闭对话框
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped></style>
