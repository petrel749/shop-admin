<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <el-row class="cat_opt">
        <el-col
          ><span>选择商品分类：</span>
          <!-- 商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            v-model="selectedCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader
        ></el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="showAddParamsDialog()"
            >添加参数</el-button
          >
          <el-table :data="manyTableData" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)"
                  >{{ item }}</el-tag
                >
                <!-- 输入Tag文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
        <el-tab-pane label="静态属性" name="only"
          ><el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisabled"
            @click="showAddParamsDialog()"
            >静态属性</el-button
          >
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)"
                  >{{ item }}</el-tag
                >
                <!-- 输入Tag文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <ParamsDialog
      :activeName="activeName"
      :cateId="cateId"
      :getParamsData="getParamsData"
      :handle="handle"
      ref="paramsDialogRef"
    ></ParamsDialog>
  </div>
</template>

<script>
const ParamsDialog = () =>
  import(/* webpackChunkName: "Params" */ "@c/goods/params/ParamsDialog.vue");
export default {
  components: {
    ParamsDialog: ParamsDialog
  },
  created() {
    this.getCateList();
  },
  data() {
    return {
      cateList: [],
      // 级联选择配置
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        chileren: "children"
      },
      // 级联选择框绑定
      selectedCateKeys: [],
      // 被激活页签名称
      activeName: "many",
      // 动态属性数据
      manyTableData: [],
      // 静态属性数据
      onlyTableData: [],
      // 操作
      handle: "add",
      // tag文本框和控制按钮切换
      inputVisible: false
    };
  },
  computed: {
    // 如果按钮需要被禁用，返回true
    isBtnDisabled() {
      return this.selectedCateKeys.length !== 3 ? true : false;
    },
    // 当前选择三级分类id
    cateId() {
      return this.selectedCateKeys.length === 3 ? this.selectedCateKeys[2] : null;
    }
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品数据列表失败！");
      }
      console.log(res.data);
      this.cateList = res.data;
    },
    async getParamsData() {
      // 不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        // 清空当前属性
        this.manyTableData = [];
        this.onlyTableData = [];
        return this.$message.error("只能选择三级分类");
      }
      // 根据所选分类id。和当前所处面板，获取对应参数
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取参数列表失败！");
      }
      console.log(res.data);
      res.data.forEach((item) => {
        //   通过三元表达式判断attr_vals是否为空
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        // 控制文本框的显示与隐藏
        item.inputVisible = false;
        // 文本框的输入值
        item.inputValue = "";
      });
      if (this.activeName === "many") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    // 级联选中变化
    handleChange() {
      this.getParamsData();
    },
    // tab点击处理函数
    handleTabClick() {
      this.getParamsData();
    },
    showAddParamsDialog() {
      this.handle = "add";
      this.$refs.paramsDialogRef.addDialogVisible = true;
    },
    async showEditDialog(attr_id) {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${attr_id}`,
        {
          params: { attr_sel: this.activeName }
        }
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取分类失败！");
      }
      this.$refs.paramsDialogRef.updateForm = res.data;
      this.$refs.paramsDialogRef.addDialogVisible = true;
      this.handle = "update";
    },
    // 根据Id删除对应的参数项
    async removeParams(attr_Id) {
      const confirmResult = await this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除！");
      }
      const { data: res } = await this.$http.delete(
        `categories/${this.cateId}/attributes/${attr_Id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("删除参数失败！");
      }
      this.$message.success("删除参数成功！");
      this.getParamsData();
    },
    // 文本框失去焦点,或者按下Enter触发
    handleInputConfirm(row) {
      // 输入的内容为空时，清空
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      // 内容不为空，数组添加参数
      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;
      // 提交数据库，保存修改
      this.saveAttrVals(row);
    },
    // 将对attr_vals（Tag） 的操作 保存到数据库
    async saveAttrVals(row) {
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(" ")
        }
      );
      if (res.meta.status !== 200) {
        return this.$message.error("修改参数项失败！");
      }
      this.$message.success("修改参数项成功！");
    },
    // 点击按钮显示输入框
    showInput(row) {
      row.inputVisible = true;
      //   让输入框自动获取焦点
      // $nextTick方法的作用：当页面元素被重新渲染之后，才会至指定回调函数中的代码
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 删除对应的参数可选项
    handleClose(i, row) {
      // 数组删除参数
      row.attr_vals.splice(i, 1);
      this.saveAttrVals(row);
    }
  }
};
</script>

<style lang="scss" scoped>
.cat_opt {
  margin: 15px;
}
el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>
