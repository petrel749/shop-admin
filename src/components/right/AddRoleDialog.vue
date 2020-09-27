<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisble"
      width="30%"
      @close="dialogClosed"
    ></el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisble: false
    };
  },
  methods: {
    dialogClosed() {}
  }
};
</script>
