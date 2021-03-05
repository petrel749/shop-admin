<template>
  <div>
    <h1>Nihao</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      cateList: []
    };
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories", { params: this.queryInfo });
      if (res.meta.status !== 200) this.$message.error("获取商品分类列表失败");
      //console.log(res)
      // 把数据赋值给cateList
      this.cateList = res.data.result;
      // 为总数据条数赋值
      this.total = res.data.total;
    }
    /* // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      // 更新数据
      this.getCateList();
    },
    // 监听pagenum改变的时间
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      // 更新数据
      this.getCateList();
    } */
  },
  watch: {
    "queryInfo.pagenum"() {
      this.getCateList();
    },
    "queryInfo.pagesize"() {
      this.getCateList();
    }
  }
};
</script>
