<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.row.pay_status">未付款</el-tag>
            <el-tag type="success" size="mini" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time"></el-table-column>
        <el-table-column label="操作">
          <template slot>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog"
            ></el-button>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-location"
              @click="showProgressDialog"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <EidtOrderDialog ref="editOrderDialogRef"></EidtOrderDialog>
    <ProgressDialog ref="progressDialogRef" :progressInfo="progressInfo"></ProgressDialog>
  </div>
</template>
<script>
const EidtOrderDialog = () =>
  import(/* webpackChunkName: "Order" */ "@c/order/EidtOrderDialog.vue");
const ProgressDialog = () => import(/* webpackChunkName: "Order" */ "@c/order/ProgressDialog.vue");
export default {
  components: {
    EidtOrderDialog: EidtOrderDialog,
    ProgressDialog: ProgressDialog
  },
  data() {
    return {
      // 订单列表查询参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      // 订单列表
      orderList: [],
      // 物流进度
      progressInfo: []
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get("orders", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取订单列表失败！");
      }
      this.total = res.data.total;
      this.orderList = res.data.goods;
    },
    // 分页
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.getOrderList();
    },
    // 打开编辑对话框
    showEditDialog() {
      this.$refs.editOrderDialogRef.addressDialogVisible = true;
    },
    async showProgressDialog() {
      // 供测试的物流单号：1106975712662
      const { data: res } = await this.$http.get("kuaidi/1106975712662");
      if (res.meta.status !== 200) {
        return this.$message.error("获取物流进度失败!");
      }
      this.progressInfo = res.data;
      console.log(this.progressInfo);
      this.$refs.progressDialogRef.progressDialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
