<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--添加分类按钮-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scope">
          <i
            class="el-icon-success"
            style="color: lightgreen"
            v-if="scope.row.cat_deleted === false"
          ></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <AddCateDialog ref="addCateDialog"></AddCateDialog>
  </div>
</template>

<script>
const AddCateDialog = () => import(/* webpackChunkName: "Cate" */ "@c/goods/cate/AddCateDialog");
export default {
  components: {
    AddCateDialog: AddCateDialog
  },
  data() {
    return {
      // 查询参数
      queryInfo: {
        type: 3,
        pageNum: 1,
        pageSize: 5
      },
      // 商品列表
      cateList: [],
      // 总数据条数
      total: 0,
      // 指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isOk"
        },
        {
          label: "排序",
          type: "template",
          template: "order"
        }
      ]
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败！");
      }
      this.$message.success("获取商品分类");
      // 给数据列表赋值
      this.cateList = res.data;
      // 总数据条数
      this.total = res.data.length;
    },
    showAddCateDialog() {
      this.$refs.addCateDialog.showAddCateDialog();
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      console.log(this.queryInfo.pageSize);
      this.getCateList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getCateList();
    }
  }
};
</script>

<style lang="scss" scoped>
.treeTable {
  margin-top: 15px;
}
</style>
